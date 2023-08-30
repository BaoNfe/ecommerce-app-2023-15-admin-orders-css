import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    totalAreaVolume: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("warehouse", warehouseSchema)