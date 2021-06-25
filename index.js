const express       = require("express");
const app           = express();
const connection    = require("./models/database");
const categoriesController  = require("./categories/CategoriesController");   
const articlesController    = require("./articles/ArticlesController");
const Category      = require("./categories/Category");
const Article       = require("./articles/Article");

//View Engine
app.set("view engine","ejs");
app.use(express.static("public"));

//BodyParser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rotas
app.use("/",categoriesController);
app.use("/",articlesController);

app.get("/",(req,resp) => {
    Category.findAll({raw: true}).then((categories)=>{

        Article.findAll({
            raw: true,
            order:[["id","DESC"]]
        }).then((articles)=>{
            resp.render("./index",{
                categories: categories,
                articles: articles
            })
        }).catch((err)=>{
            console.log(err);
        });

    }).catch((err)=>{
        console.log(erro);
    })
});

app.get("/:slug",(req,resp) => {
    let slug = req.params.slug;

    Category.findAll({raw: true}).then((categories)=>{
        Article.findOne({
            raw: true,
            where: {
                slug: slug
            },
        }).then((article)=>{
            if(article == null){
                console.log(article);
                resp.redirect("/");
            }else{
                resp.render("article",{
                    categories: categories,
                    article: article
                });
            }  
        }).catch((erro)=>{
            resp.redirect("/");
            console.log(erro);
        })
    })
})

app.get("/category/:slug",(req,resp)=>{
    let slug = req.params.slug;
    
    if(slug == null){
        resp.redirect("/");
    }

    Category.findAll({
        raw: true,
        where:{
            slug: slug
        },
        include: [{model: Article}]
    }).then((category)=>{

        Category.findAll({raw: true}).then((categories)=>{
            resp.render("category",{
                articles: category,
                categories: categories
            })
        })

    }).catch((erro)=>{
        resp.redirect("/");
        console.log(erro);
    })
    
})

app.listen("80", ()=>{});