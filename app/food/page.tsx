"use client";

import React, { useEffect, useState } from "react";
import {
    useSession,
    useSupabaseClient,
    Session,
} from "@supabase/auth-helpers-react";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    DateInput,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";
import {
    ArrowUpRight,
    DiamondPlus,
    HandCoins,
    Hourglass,
    MapPin,
    Shapes,
    Tag,
    Trash2,
} from "lucide-react";

interface Food {
    id: number;
    "Item Name": string;
    Category: string;
    Quantity: number;
    "Expiration Date": string;
    "Storage Location": string;
}

const columns = [
    { name: "ITEM NAME", uid: "Item Name" },
    { name: "CATEGORY", uid: "Category" },
    { name: "QUANTITY", uid: "Quantity" },
    { name: "EXPIRATION DATE", uid: "Expiration Date" },
    { name: "STORAGE LOCATION", uid: "Storage Location" },
    { name: "ACTIONS", uid: "actions" },
];

export default function FoodPage() {
    const session: Session | null = useSession();
    const supabase = useSupabaseClient();
    const [foods, setFoods] = useState<Food[]>([]);
    const [newItemName, setNewItemName] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [newQuantity, setNewQuantity] = useState<number | undefined>();
    const [newExpirationDate, setNewExpirationDate] = useState(
        today(getLocalTimeZone())
    );
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [newStorageLocation, setNewStorageLocation] = useState("");

    useEffect(() => {
        if (session) {
            fetchFoods();
        }
    }, [session]);

    const fetchFoods = async (): Promise<void> => {
        const { data } = await supabase.from("food").select("*");

        setFoods(data as Food[]);
    };

    const addFood = async (): Promise<void> => {
        await supabase.from("food").insert([
            {
                user_id: session!.user.id,
                "Item Name": newItemName,
                Category: newCategory,
                Quantity: newQuantity,
                "Expiration Date": newExpirationDate
                    .toDate(getLocalTimeZone())
                    .toLocaleDateString("de-DE"),
                "Storage Location": newStorageLocation,
            },
        ]);
        await fetchFoods();
        setNewItemName("");
        setNewCategory("");
        setNewQuantity(undefined);
        setNewStorageLocation("");
    };

    const deleteFood = async (id: number): Promise<void> => {
        await supabase.from("food").delete().eq("id", id);
        await fetchFoods();
    };

    const renderCell = (food: Food, columnKey: React.Key) => {
        const cellValue = food[columnKey as keyof Food];

        if (columnKey === "actions") {
            return (
                <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onPress={() => deleteFood(food.id)}
                >
                    <Trash2 />
                </Button>
            );
        }

        if (columnKey === "Item Name") {
            return (
                <div className="flex items-center gap-2">
                    <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{
                            backgroundColor: "var(--nextui-colors-primary)",
                        }}
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-default-900">
                            {cellValue}
                        </span>
                        <span className="text-sm text-default-500">
                            {food.Category}
                        </span>
                    </div>
                </div>
            );
        }

        return <span className="text-sm text-default-900">{cellValue}</span>;
    };

    return (
        <div className="p-8">
            <Card>
                <CardHeader className="text-2xl font-bold">
                    Food Inventory
                </CardHeader>
                <CardBody className="flex flex-col gap-6">
                    <Table>
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={foods}>
                            {(item: Food) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => (
                                        <TableCell>
                                            {renderCell(item, columnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardBody>

                <CardFooter>
                    <Button
                        color="success"
                        endContent={<DiamondPlus />}
                        onPress={onOpen}
                    >
                        Add Food
                    </Button>

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">
                                        New Food Item
                                    </ModalHeader>
                                    <ModalBody className="flex flex-wrap gap-4">
                                        <Input
                                            label="Food Name"
                                            labelPlacement="outside"
                                            placeholder="e.g. Apple"
                                            startContent={
                                                <Tag className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                            }
                                            value={newItemName}
                                            onChange={(e) =>
                                                setNewItemName(e.target.value)
                                            }
                                        />
                                        <Input
                                            label="Category"
                                            labelPlacement="outside"
                                            placeholder="e.g. Fruits"
                                            startContent={
                                                <Shapes className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                            }
                                            value={newCategory}
                                            onChange={(e) =>
                                                setNewCategory(e.target.value)
                                            }
                                        />
                                        <Input
                                            label="Quantity"
                                            labelPlacement="outside"
                                            placeholder="e.g. 5"
                                            startContent={
                                                <HandCoins className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                            }
                                            type="number"
                                            value={
                                                newQuantity?.toString() ?? ""
                                            }
                                            onChange={(e) =>
                                                setNewQuantity(
                                                    Number(e.target.value)
                                                )
                                            }
                                        />
                                        <DateInput
                                            defaultValue={today(
                                                getLocalTimeZone()
                                            )}
                                            label="Expiration Date"
                                            labelPlacement="outside"
                                            minValue={today(getLocalTimeZone())}
                                            startContent={
                                                <Hourglass className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                            }
                                            value={newExpirationDate}
                                            onChange={(date) =>
                                                date &&
                                                setNewExpirationDate(date)
                                            }
                                        />
                                        <Input
                                            label="Storage Location"
                                            labelPlacement="outside"
                                            placeholder="e.g. Fridge"
                                            startContent={
                                                <MapPin className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                            }
                                            value={newStorageLocation}
                                            onChange={(e) =>
                                                setNewStorageLocation(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="danger"
                                            variant="light"
                                            onPress={onClose}
                                        >
                                            cancel
                                        </Button>

                                        <Button
                                            className="font-semibold"
                                            color="primary"
                                            endContent={
                                                <ArrowUpRight className="text-2xl text-primary-400 pointer-events-none flex-shrink-0" />
                                            }
                                            type="submit"
                                            variant="bordered"
                                            onPress={() => {
                                                addFood();
                                                onClose();
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </CardFooter>
            </Card>
        </div>
    );
}
