import { Request, Response } from "express";
const Company = require("../models/CompanyModel");
interface item {
  _id: string;
  itemTitle: string;
  itemDescription: string;
}
export const CreateAboutPage = async (req: Request, res: Response) => {
  try {
    let addTitle = new Company({
      title: req.body.title,
    });
    addTitle = addTitle.save();
    if (addTitle) {
      return res.status(201).json({
        data: addTitle,
        msg: "Title Saved successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", success: false });
  }
};
export const AddAboutUs = async (req: Request, res: Response) => {
  try {
    const updateTitle = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (updateTitle) {
      return res.status(201).json({
        data: updateTitle,
        msg: "Title updated successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", success: false });
  }
};
export const GetAboutUs = async (req: Request, res: Response) => {
  try {
    const aboutus = await Company.find();
    if (aboutus) {
      return res.status(201).json({ data: aboutus, success: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", success: false });
  }
};
export const DeleteItemById = async (req: Request, res: Response) => {
  const companyId = req.params.companyId;
  const itemId = req.params.itemId;

  try {
    const updatedCompany = await Company.findOneAndUpdate(
      { _id: companyId },
      {
        $pull: {
          HeaderSection: { _id: itemId },
        },
      },
      {
        new: true,
      }
    );

    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json({ msg: "Data Deleted successfully", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const AddAboutSection = async (req: Request, res: Response) => {
  const { itemTitle, itemDescription } = req.body;
  const id = req.params.id;
  try {
    const findmodel = await Company.findById(id);
    if (findmodel) {
      const SectionObject = {
        itemTitle,
        itemDescription,
      };
      findmodel.HeaderSection.unshift(SectionObject);
      await findmodel.save();
      if (findmodel) {
        return res.status(201).json({
          data: findmodel,
          msg: "Data Saved successfully",
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", success: false });
  }
};

export const UpdateAboutSection = async (req: Request, res: Response) => {
  const { itemTitle, itemDescription } = req.body;
  const id = req.params.id;
  const companyId = req.params.companyId;
  try {
    const findmodel = await Company.findById(companyId);
    if (!findmodel) {
      return res.status(404).json({ error: "Company not found" });
    } else {
      const headerItemIndex = findmodel.HeaderSection.findIndex(
        (item: item) => item._id.toString() === id
      );
      if (headerItemIndex === -1) {
        return res.status(404).json({ error: "Header item not found" });
      }
      findmodel.HeaderSection[headerItemIndex].itemTitle = itemTitle;
      findmodel.HeaderSection[headerItemIndex].itemDescription =
        itemDescription;
      await findmodel.save();
      if (findmodel) {
        return res.status(201).json({
          data: findmodel,
          msg: "Data Saved successfully",
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", success: false });
  }
};
