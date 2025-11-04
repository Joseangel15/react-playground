'use client';

import { get } from "http";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";


export default function ContextAPI() {
    const {userInfo, handleChangeForm} = useContext(UserContext);

    // TypeScript helper for clean data extraction and type assertion
    const getFormDataValue = (formData: FormData, key: string): string => 
        (formData.get(key) as string) || '';

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const updatedUserInfo = {
            name: getFormDataValue(formData, 'name'),
            age: Number(formData.get('age')),
            dob: getFormDataValue(formData, 'dob'),
            nationality: getFormDataValue(formData, 'nationality'),
            gender: getFormDataValue(formData, 'gender')
        };

        handleChangeForm(updatedUserInfo);

        console.log("State dispatch attempted with:", updatedUserInfo); 

    };
    
    return (
        <main className="h-screen p-5">
            <h1 className="text-center text-3xl">This is an example of using the context API</h1>
            <div>
                <h2>Update user Info</h2>
                <form action="" className="flex flex-col border-2 max-w-lg p-2.5" onSubmit={handleFormSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" defaultValue={userInfo.name}/>
                    <label htmlFor="age">Age</label>
                    <input type="number" name="age" defaultValue={userInfo.age}/>
                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <input type="date" name="date-of-birth" defaultValue={userInfo.dob}/>
                    <label htmlFor="nationality">Nationality</label>
                    <select name="nationality" id="nationality" className="border-1 mb-2.5" defaultValue={userInfo.nationality}>
                        <option value="USA">USA</option>
                        <option value="other">other</option>
                    </select>
                    <fieldset>
                        <legend>Gender</legend>
                        <input type="radio" id="male" name="gender" value="male" defaultChecked={userInfo.gender === 'male' ? true : false}/>
                        <label htmlFor="male" className="mr-2.5">Male</label>
                        <input type="radio" id="female" name="gender" value="female" defaultChecked={userInfo.gender === 'female' ? true : false}/>
                        <label htmlFor="female">Female</label>
                    </fieldset>
                    <button type="submit" className="bg-green-800 cursor-pointer hover:bg-green-900">Save</button>
                </form>
            </div>
        </main>
    );
}