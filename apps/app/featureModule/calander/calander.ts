import { prismaClient } from "db/client";
import { Router } from "express";

const calanderRouter = Router();

calanderRouter.get("/:couseId", async (req,res) => {
    const courseId = req.params.couseId;
    const course = await prismaClient.course.findFirst({
        where: {
            id: courseId
        }
    })

    const purchases = await prismaClient.purchases.findFirst({
        where: {
            userId: req.userId,
            courseId: courseId
        }
    })

    if(!purchases) {
        res.status(403).json({
            message: "You don't have access to this course"
        })
        return;
    }

    if(!course) {
        res.status(404).json({
            message: "Course not found"
        })
        return;
    }

    res.json({
        id: course.id,
        calanderId: course.calanderNotionId
    })
})

export {calanderRouter}