const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const path = require('path')
const {static} = require("express");


class Course{
    constructor(title,price,img) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.id = uuidv4();
    }

    toJSON(){
        return {
            title:this.title,
            price:this.price,
            img:this.img,
            id:this.id
        }
    }

    async save(){
        const courses = await Course.getAll();
        courses.push(this.toJSON());
        console.log(courses);
        return new Promise((resolve,reject)=>{
            fs.writeFile(path.join(__dirname,'..','data','courses.json'),
                JSON.stringify(courses), (err)=>{
                if (err) {
                    reject(err)
                }else{
                    resolve();
                }
            })
        })

    }

    static getAll(){
        return new Promise((resolve,reject)=>{
            fs.readFile(
                path.join(__dirname,'..','data','courses.json'),
                'utf-8',(err,content)=> {
                    if (err) {reject(err)}
                    else{
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }
    static async getByid(id){
        const courses = await Course.getAll();
        return courses.find(item => item.id === id);
    }

    static async editCourse(obj){
        const courses = await Course.getAll();
        const idx = courses.findIndex(i => i.id === obj.id);
        courses[idx]=obj;

        return new Promise((resolve,reject)=>{
            fs.writeFile(path.join(__dirname,'..','data','courses.json'),
                JSON.stringify(courses), (err)=>{
                    if (err) {
                        reject(err)
                    }else{
                        resolve();
                    }
                })
        })
    }
}

module.exports = Course;