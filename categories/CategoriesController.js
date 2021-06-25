const express = require("express");
const slugify = require("slugify");
const Category = require("./Category");
const router = express.Router();

router.get("/admin/categories",(req,resp)=>{
    Category.findAll({
        raw: true
    }).then((content) => {
        resp.render("admin/categories/index",{
            content: content
        });
    })
})

router.get("/admin/categories/new",(req,resp)=>{
    resp.render("./admin/categories/new");
})

router.post("/categories/save",(req,resp)=>{
    let title = req.body.title;
    if( title != null){
        Category.create({
            title: title,
            slug:slugify(title,{
                lower: true,
                remove: /[*+~.()'"!:@]/g
            }) 
        }).then(()=>{
            resp.redirect("/admin/categories");
        })

    }else{
        resp.redirect("/admin/categories/new");
    }
})

router.post("/categories/delete",(req,resp)=>{
    let id = req.body.id;

    if(id != null){
        if(!isNaN(id)){
            Category.destroy({
                where:{
                    id: id
                }
            }).then(()=>{
                resp.redirect("/admin/categories");
            })
        }else
            resp.redirect("/admin/categories");
    
    }else
        resp.redirect("/admin/categories");  
    
})

router.get("/admin/categories/edit/:id",(req,resp)=>{
    let id = req.params.id;
    
    if(isNaN(id))
        resp.redirect("/admin/categories");

    Category.findByPk(id,{
        raw: true
    }).then((content)=>{

        if(content != undefined)
            resp.render("./admin/categories/edit", {
                content: content
            });
        else
            resp.redirect("/admin/categories");
        
    }).catch((erro)=>{
        resp.redirect("/admin/categories");
    })
    
})

router.post("/categories/update",(req,resp)=>{
    let id = req.body.id;
    let title = req.body.title;
    let slug = slugify(title,{
        lower: true,
        remove: /[*+~.()'"!:@]/g
    })

    Category.update({title: title, slug: slug},{
        where:{ id: id }
    }).then(()=>{
        resp.redirect("/admin/categories");
    })
})

module.exports = router;