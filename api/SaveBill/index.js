module.exports = async function (context, req) {
    const bill = req.body;

    if (!bill || !bill.rowKey) {
        context.res = { status: 400, body: "Invalid Bill Data" };
        return;
    }

    // Azure Table Storage requires PartitionKey and RowKey
    context.bindings.tableBinding = {
        PartitionKey: "GST_INVOICES",
        RowKey: bill.rowKey, // Invoice Number
        ClientName: bill.client,
        TotalAmount: bill.total,
        InvoiceDate: bill.date,
        ItemsJson: bill.items // Stringified JSON
    };

    context.res = {
        status: 200,
        body: { message: "Bill saved successfully to Azure!" }
    };
};