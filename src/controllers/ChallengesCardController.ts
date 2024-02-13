import { Request, Response } from "express";
const ChallengeCard = require("../models/ChallengesCardModel");
const Challenges = require("../models/ChallengesModel");
export const ChallengesCard = async (req: Request, res: Response) => {
  const { title, challengeID, description, isActive, isDeleted } = req.body;
  try {
    const findmodel = await Challenges.find({ challengeID });
    if (!findmodel) {
      return res.status(400).json({ statusCode: 400, msg: "Invalid Id" });
    }
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
    }
    let chalenge = new ChallengeCard({
      title,
      description,
      challengeID,
      image: `cards/${imageFileName}`,
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
      msg: "Data is Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const GetChallengesCard = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let getchallenges = await ChallengeCard.findById(id);
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
export const GetAllChallengesCard = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let getallchallenges = await ChallengeCard.find();
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

export const deleteChallengesCard = async (req: Request, res: Response) => {
  try {
    let delchalenge = await ChallengeCard.findByIdAndRemove(req.params.id);
    if (delchalenge) {
      return res.status(200).json({
        statusCode: 200,
        msg: "Data Deleted successfully",
        success: true,
      });
    }
    return res
      .status(404)
      .json({ statusCode: 404, msg: "Data not found", success: false });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const UpdateChallengesCard = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
      data.image = `cards/${imageFileName}`;
    }
    let updatechalenge = await ChallengeCard.findByIdAndUpdate(
      req.params.id,
      {
        $set: data,
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
