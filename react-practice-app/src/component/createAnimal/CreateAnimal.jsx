import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import SpeciesService from './../../service/SpeciesService';
import AnimalService from "../../service/AnimalService";
import vuongsonhien from "../../assets/image/vuongsonhien.jpg";
import FileService from "../../service/FileService";

const schema = yup.object({
    name: yup.string().min(6, "Tên thú cưng tối thiểu 6 ký tự").max(20, "Tên thú cưng tối đa 20 ký tự").required("Name không được để trống"),
    // avatar: yup.string().required("Avatar không được để trống")
})

function CreateAnimal() {

    const [species, setSpecies] = useState([]);

    const [selectAvatar, setSelectAvatar] = useState({
        file: null,
        fileUrl: ""
    });

    const [loading, setLoading] = useState(false);
    const [uploadedAvatar, setUploadedAvatar] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            let res = await SpeciesService.getSpecies();
            setSpecies(res.data)
        }
        getData()
    }, [])

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })


    const handleCreateAnimal = async (data) => {
        console.log("Button clicked");

        data = {
            ...data,
            species: JSON.parse(data.species),
            avatar: uploadedAvatar || vuongsonhien
        }

        let res = await AnimalService.createAnimal(data);
        console.log(res);

        if (res && res.data) {
            toast.success("Thêm thành công", { autoClose: 1000 })
            navigate("/animal")
        }
    }

    const handleSelectAvatar = (e) => {
        const tempAvatarUrl = URL.createObjectURL(e.target.files[0])
        setSelectAvatar({
            file: e.target.files[0],
            fileUrl: tempAvatarUrl
        })
    }

    const handleUploadAvatar = async () => {
        setLoading(true);

        const uploadResult = await FileService.uploadAvatar(selectAvatar.file);

        if (uploadResult && uploadResult?.data) {
            setUploadedAvatar(uploadResult?.data.url);

            toast.success("Upload thành công", { autoClose: 1000 });

            setLoading(false)
        }
    }


    return (
        <div className='container'>
            <div className="row">
                <form className='d-flex justify-content-center align-items-center mt-5' onSubmit={handleSubmit(handleCreateAnimal)}>
                    <div className='col-4 me-3'>
                        <h1 className='mb-4 mt-3 text-center'>Create animal</h1>
                        <div>
                            <div className='mb-2 row align-items-center'>
                                <label className='col-sm-3 col-form-label text-end'>Name</label>
                                <div className='col-sm-9'>
                                    <input type='text' className='form-control' {...register("name")} />
                                    <span className="text-danger">{errors?.name?.message}</span>
                                </div>
                            </div>
                            <div className='mb-2 row align-items-center'>
                                <label className='col-sm-3 col-form-label text-end'>Gender</label>
                                <div className='col-sm-9 d-flex align-items-center'>
                                    <div className="form-check form-check-inline me-3">
                                        <input className="form-check-input" type="radio" value={"male"} defaultChecked={true} {...register('gender')} />
                                        <label className="form-check-label">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" value={'female'} {...register('gender')} />
                                        <label className="form-check-label">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-2 row align-items-center'>
                                <label className='col-sm-3 col-form-label text-end'>Spices</label>
                                <div className='col-sm-9'>
                                    <select className="form-control" {...register("species")}>
                                        {
                                            species?.map((spe) => (
                                                <option key={spe.id} value={JSON.stringify(spe)}>{spe.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-3 d-flex justify-content-center align-items-center'>
                                <button type='submit' className='btn btn-primary btn-block col-4'>Create animal</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card justify-content-center">
                            <img role="button" src={selectAvatar.fileUrl || vuongsonhien} alt="" style={{ width: '100%', height: '350px' }}
                                {...register("image")} className="card-img-top" onClick={() => document.getElementById("fileUpload").click()} />
                        </div>
                        <div className="card-footer d-grid gap-2 mt-1">
                            <input type="file" accept="image/*" className="d-none" onChange={handleSelectAvatar} id="fileUpload" />
                            {
                                loading ? (
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <button className="btn btn-primary" onClick={handleUploadAvatar}>Upload image</button>
                                )
                            }
                        </div>
                    </div>
                </form >
            </div>
        </div >
    );
}

export default CreateAnimal;
