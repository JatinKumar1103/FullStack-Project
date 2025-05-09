import mongoose, { Schema, Document } from "mongoose";

interface IQuestion extends Document {
  questionText: string;
  options: string[];
  correctAnswer: string;
  quizId: Schema.Types.ObjectId;
}

const questionSchema = new Schema<IQuestion>(
  {
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (val: string[]) => val.length >= 2,
        message: "Options must have between 4 and 5 choices."
      }
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (this: IQuestion, val: string) {
          return this.options.includes(val);
        },
        message: "Correct answer must be one of the provided options."
      }
    },
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model<IQuestion>("Question",questionSchema)
