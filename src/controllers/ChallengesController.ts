import { Request, Response } from "express";
const Challenges = require("../models/ChallengesModel");
export const Challenge = async (req: Request, res: Response) => {
  const { title, description, isActive, isDeleted } = req.body;
  try {
    let chalenge = new Challenges({
      title,
      description,
      isActive,
      isDeleted,
    });
    await chalenge.save();
    if (!chalenge) {
      return res
        .status(500)
        .json({ statusCode: 500, error: "Failed to create new Items" });
    }
    return res.status(201).json({
      statusCode: 201,
      data: chalenge,
      msg: "Data Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const UpdateChallenges = async (req: Request, res: Response) => {
  try {
    let updatechalenge = await Challenges.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatechalenge) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }

    return res.status(200).json({
      statusCode: 200,
      data: updatechalenge,
      msg: "Data Updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
// get All DATA
export const GetChallenges = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let getchallenges = await Challenges.findById(id);
    if (!getchallenges) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Data not found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getchallenges, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const GetAllChallenges = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let getallchallenges = await Challenges.find();
    if (!getallchallenges) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Data not found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getallchallenges, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteChallenges = async (req: Request, res: Response) => {
  try {
    let delchalenge = await Challenges.findByIdAndRemove(req.params.id);
    if (!delchalenge) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }
    return res.status(200).json({ statusCode: 200, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
