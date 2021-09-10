"use strict";var express=require("express"),app=express(),port=process.env.PORT||3e3,cookieParser=require("cookie-parser");app.use(express.json()),app.use(express.static("public")),app.use(cookieParser());var clientRoute=require("./routes/routeClients"),projectRoute=require("./routes/routeProjects"),taskRoute=require("./routes/routeTasks"),userRoute=require("./routes/routeUsers");app.use("/clients",clientRoute),app.use("/projects",projectRoute),app.use("/tasks",taskRoute),app.use("/users",userRoute),app.listen(port,function(){console.log("Listening on port: ".concat(port))});