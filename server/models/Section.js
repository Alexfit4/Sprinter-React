import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });

const sectionSchema = new Schema({
    name: { type: 'String', required: true },
    cards: [{ type: Schema.ObjectId, ref: 'Card', required: true }],
    id: { type: 'String', required: true, unique: true },
    order: { type: 'Number', required: false },
});

function populateCards(next) {
    this.populate('cards');
    next();
};

sectionSchema.pre('find', populateCards);
sectionSchema.pre('findOne', populateCards);

export default mongoose.model('Section', sectionSchema);