import mongoose, { Document, Schema } from "mongoose";

type Price = {
  min: string;
  max: string;
};

type PetSort = "강아지" | "고양이";
type Gender = "male" | "female";

interface IPet extends Document, PetType {}

export type PetType = {
  userIdentifier: string;
  petSort?: PetSort;
  name: string;
  kind?: string;
  life?: string;
  personality?: string[];
  photourl?: string;
  gender: Gender;
  birth: String;
  price: Price;
};

const PetSchema: Schema = new Schema({
  userIdentifier: {
    type: String,
    required: true,
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
  },
  gender: {
    type: String,
  },
  birth: {
    type: String,
  },
  price: {
    type: {
      min: String,
      max: String,
    },
  },
  life: {
    type: String,
  },
});

export default mongoose.model<IPet>("Pet", PetSchema);
