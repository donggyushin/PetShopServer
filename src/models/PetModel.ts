import mongoose, { Document, Schema } from "mongoose";

type PetSort = "강아지" | "고양이";
type Gender = "male" | "female";

interface IPet extends Document, PetType {}

export type PetType = {
  userIdentifier: string;
  petSort?: PetSort;
  name: string;
  kind?: string;
  personality?: string[];
  photourl?: string;
  gender: Gender;
  birth: string;
  photos?: {
    url: string;
    favorite: boolean;
  }[];
  birthDate: Date;
};

const PetSchema: Schema = new Schema({
  userIdentifier: {
    type: String,
    required: true,
  },
  photos: {
    type: [
      {
        url: String,
        favorite: Boolean,
      },
    ],
  },
  petSort: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  personality: {
    type: [String],
  },
  kind: {
    type: String,
  },
  photourl: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
  },
});

export default mongoose.model<IPet>("Pet", PetSchema);
