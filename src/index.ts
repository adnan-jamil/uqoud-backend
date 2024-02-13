import { NextFunction, Request, Response } from "express";
import express from "express";
const app = express();
import cors from "cors";
const mongodb = require("./config/db");
import bodyParser from "body-parser";
mongodb();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/upload", express.static("upload"));
const PORT = 8000;
// Base Route
app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});
// Admin Routes
import authrouter from "./routes/AuthRoute";
import aboutTech from "./routes/AboutTechRoute";
import sliderrouter from "./routes/HomeSlider";
import Contractroute from "./routes/ContractMNGRoute";
import FocusRoute from "./routes/FocusesRoute";
import ChalengeRoute from "./routes/ChallengesRoute";
import useCaseRoute from "./routes/UseCaseRoute";
import HowItworkRoute from "./routes/HowItWorkRoute";
import productRoute from "./routes/ProductsRoute";
import productsectionRoute from "./routes/ProductSectionsRoute";
import FAQRoute from "./routes/FAQsRoute";
import TestimonialRoute from "./routes/TestimonialsRoute";
import ManagementRoute from "./routes/ManagementItemsRoute";
import ContactRoute from "./routes/ContactInfoRoute";
import MessageRoute from "./routes/MessagesRoute";
import chaCardRoute from "./routes/ChallengesCardRoute";
import AboutRoute from "./routes/CompanyRoute";
import AboutToolsRoute from "./routes/CompanyToolRoute";
import AboutTechRoute from "./routes/AboutTechRoute";
import AboutTechCardRoute from "./routes/TechfeatureCardRoute";
import AboutValuesRoute from "./routes/CompanyValuesRoute";
import AboutBrandsRoute from "./routes/CompanyBrandRoute";
import PricePageRoute from "./routes/PricePageRoute";
import PricePlanRoute from "./routes/PricePlanRoute";
import LanguageRoute from "./routes/LanguageRoute";
import UserHomeRoute from "./routes/UserDataRoute";
import PriceSupport from "./routes/PriceCustomerSupportRoute";
// Admin APIs
app.use("/api/v1/admin/", aboutTech);
app.use("/api/v1/admin/", authrouter);
app.use("/api/v1/admin/", sliderrouter);
app.use("/api/v1/admin/", ChalengeRoute);
app.use("/api/v1/admin/", Contractroute);
app.use("/api/v1/admin/", HowItworkRoute);
app.use("/api/v1/admin/", FocusRoute);
app.use("/api/v1/admin/", FAQRoute);
app.use("/api/v1/admin/", ContactRoute);
app.use("/api/v1/admin/", chaCardRoute);
app.use("/api/v1/admin/", AboutRoute);
app.use("/api/v1/admin/", AboutToolsRoute);
app.use("/api/v1/admin/", AboutTechRoute);
app.use("/api/v1/admin/", AboutValuesRoute);
app.use("/api/v1/admin/", AboutBrandsRoute);
app.use("/api/v1/admin/", LanguageRoute);
app.use("/api/v1/admin/", PricePlanRoute);
app.use("/api/v1/admin/", PricePageRoute);
app.use("/api/v1/admin/", AboutTechCardRoute);
app.use("/api/v1/admin/", MessageRoute);
app.use("/api/v1/admin/", ManagementRoute);
app.use("/api/v1/admin/", TestimonialRoute);
app.use("/api/v1/admin/", productsectionRoute);
app.use("/api/v1/admin/", productRoute);
app.use("/api/v1/admin/", useCaseRoute);
app.use("/api/v1/admin/", PriceSupport);

// user APIs
app.use("/api/v1/public/", UserHomeRoute);
// Not Found Handler
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});
app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`));
