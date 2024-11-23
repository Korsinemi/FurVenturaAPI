import { Schema, model } from 'mongoose';

const inventoryItemSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    limitedCopyNumber: {
        type: Number,
        required: function () { return this.item.isLimited; }
    }
});

const inventorySchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    items: [inventoryItemSchema]
});

const Inventory = model('Inventory', inventorySchema);

export default Inventory;