import mongoose, { Schema, Document } from "mongoose";

export interface IDataAccess extends Document  {
  userId: Schema.Types.ObjectId;
  data: any;
  accessedByAdmin: Schema.Types.ObjectId;
  timestamp: Date;
  metadata?: Record<string, any>;
}

const dataAccessSchema = new Schema<IDataAccess>(
  {

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
    accessedByAdmin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

export const DataAccess = mongoose.model<IDataAccess>("DataAccess", dataAccessSchema);
