const express   = require("express");
const slugify = require("slugify");
const router    = express.Router();
const Category  = require("../categories/Category");
const Article   = require("./Article");

router.get("/admin/articles",(req,resp)=>{

    if(req.query == null){
        console.log(null)
    }else{
        console.log(req.query);
    }

    Article.findAll({
        raw: true,
        order: [["id","DESC"]],
        include: [{model: Category}]
    }).then(content=>{
        resp.render("./admin/articles",{content: content});
    })
    
})

router.get("/admin/articles/new",(req,resp)=>{

    Category.findAll({
        raw: true,
        attributes: ['id','title']
    }).then((content)=>{
        if(content != undefined)
            resp.render("./admin/articles/new",{content: content});
        else
            resp.send("<script> alert('É preciso cadastrar no mínimo uma categoria'); document.location.href = '/admin/categories'; </script>")
    })
    
})

router.post("/articles/save",(req,resp)=>{
    let title       = req.body.title;
    let slug        = slugify(title,{
        lower: true,
        remove: /[*+~.()'"!:@]/g
    });
    let body        = req.body.body;
    let categoryId  = req.body.categoryId;

    Article.create({
        title: title,
        body: body,
        slug: slug,
        categoryId: categoryId
    }).then(()=>{
        resp.redirect("/admin/articles");
    }).catch((erro)=>{
        resp.redirect("/admin/articles");
    })
})

router.post("/articles/delete",(req,resp)=>{
    let id = req.body.id;

    Article.destroy({
        where:{id: id}
    }).then(()=>{
        resp.redirect("/admin/articles");
    }).catch((erro)=>{
        resp.redirect("/admin/articles");
    })

})

router.get("/admin/articles/edit/:id",(req,resp)=>{
    let id = req.params.id;

    if(isNaN(id)){
        resp.redirect("/admin/articles");
    }

    Article.findByPk(id,{
        raw:true
    }).then((article)=>{
        if(article != undefined){
            Category.findAll({raw: true}).then((categories)=>{
                resp.render("./admin/articles/edit",{
                    categories: categories,
                    article: article
                }); 
            })
        }else{
            resp.redirect("/admin/articles");
        }
    }).catch((erro)=>{
        resp.redirect("/admin/articles");
    })
})

module.exports = router;