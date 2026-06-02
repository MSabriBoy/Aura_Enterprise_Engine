function InventoryTable({
    products,
}) {
    return (
        <div className="max-h-[600px] overflow-auto rounded-xl border">
            <table className="min-w-full">
                <thead className="sticky top-0 z-10 bg-gray-100">
                    <tr className="border-b">
                        <th className="p-3 text-left">
                            SKU
                        </th>

                        <th className="p-3 text-left">
                            Product
                        </th>

                        <th className="p-3 text-left">
                            Category
                        </th>

                        <th className="p-3 text-left">
                            Price
                        </th>

                        <th className="p-3 text-left">
                            Cost
                        </th>

                        <th className="p-3 text-left">
                            Stock
                        </th>

                        <th className="p-3 text-left">
                            Reorder Level
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(
                        (product) => (
                            <tr
                                key={product._id}
                                className="border-b"
                            >
                                <td className="p-3">
                                    {product.sku}
                                </td>

                                <td className="p-3">
                                    {
                                        product.productName
                                    }
                                </td>

                                <td className="p-3">
                                    {
                                        product.category
                                    }
                                </td>

                                <td className="p-3">
                                    ${product.price}
                                </td>

                                <td className="p-3">
                                    ${product.cost}
                                </td>

                                <td className="p-3">
                                    {product.stockQuantity}
                                </td>

                                <td className="p-3">
                                    {product.reorderLevel}
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryTable;