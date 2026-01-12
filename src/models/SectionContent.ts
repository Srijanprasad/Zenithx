import mongoose, { Schema, Model } from 'mongoose';

export interface ISectionContent {
    sectionId: string;
    title: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    features?: string[];
    animationState?: string; // e.g., 'implode', 'explode', 'rotate'
}

const SectionContentSchema = new Schema<ISectionContent>({
    sectionId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    ctaText: { type: String },
    features: [{ type: String }],
    animationState: { type: String },
});

// Helper to get or create model (fixes Next.js hot-reload model overwrite errors)
const getModel = (): Model<ISectionContent> => {
    if (mongoose.models.SectionContent) {
        return mongoose.models.SectionContent as Model<ISectionContent>;
    }
    return mongoose.model<ISectionContent>('SectionContent', SectionContentSchema);
};

export const SectionContent = getModel();
