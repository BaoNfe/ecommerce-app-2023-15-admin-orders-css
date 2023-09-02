import express from "express";
import {
    warehousesFiltersController,
    getWareHouseController,
    getWareHousesController,
    createWareHouseController,
    deleteWarehouseController,
    searchWarehouseController,
    updateWareHouseController,
} from "../controllers/warehouseController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
    "/create-warehouse",
    requireSignIn,
    isAdmin,
    formidable(),
    createWareHouseController
);

router.put(
    "/update-warehouse/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateWareHouseController
);

router.get("/get-warehouse", getWareHousesController)

router.get("/get-warehouse/:slug", getWareHouseController)

router.post("/warehouse-filter", warehousesFiltersController)

router.delete("/delete-product/:pid", deleteWarehouseController)

router.get("/sreach-warehouse/:keyword", searchWarehouseController)

export default router;