import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateWarehouse = () => {
    const navigate = useNavigate();
    const [warehouse, setWarehouse] = useState("");
    const [name, setName] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [totalAreaVolume, setTotalArea] = useState("");
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const warehouseData = new FormData();
            warehouseData.append("name", name);      
            warehouseData.append("province", province);
            warehouseData.append("city", city);
            warehouseData.append("district", district);
            warehouseData.append("street", street);
            warehouseData.append("number", number);
            warehouseData.append("totalAreaVolume", totalAreaVolume);
            const { data } = axios.post(
                "/api/v1/warehouse/create-warehouse",
                warehouseData
            );
            if (data?.success) {
                toast.error(data?.message);
                console.log(data)
            } else {
                toast.success("warehouse Created Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    const getAllWarehouse = async () => {
        try {
          const { data } = await axios.get("/api/v1/warehouse/get-warehouse");
          setWarehouse(data.warehouse);
        } catch (error) {
          console.log(error);
          toast.error("Someething Went Wrong");
        }
      };

    useEffect(() => {
        getAllWarehouse();
    }, [])

    return (
        <Layout title={"Dashboard - Create warehouse"}>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create warehouse</h1>
                        <div className="m-1 w-75">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={province}
                                    placeholder="write a Province"
                                    className="form-control"
                                    onChange={(e) => setProvince(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={city}
                                    placeholder="write a City"
                                    className="form-control"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={district}
                                    placeholder="write a district"
                                    className="form-control"
                                    onChange={(e) => setDistrict(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={street}
                                    placeholder="write a street"
                                    className="form-control"
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={number}
                                    placeholder="write a number"
                                    className="form-control"
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={totalAreaVolume}
                                    placeholder="write a total area"
                                    className="form-control"
                                    onChange={(e) => setTotalArea(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>
                                    CREATE warehouse
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateWarehouse;