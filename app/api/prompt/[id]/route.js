import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();

        const prompts = await Prompt.findById(params.id).populate('creator')

        if(!prompts) return new Response("Prompt not found", { status: 404 })

        return new Response(
            JSON.stringify(prompts),
            { status: 200 }
        )
    } catch (error) {
        return new Response(
            'Failed to fecth all prompts',
            { status: 500 }
        )
    }
}

export const PATCH = async (request, { params }) => {
    
    const { prompt, tag } = await request.json();
    
    try {
        await connectToDatabase();

        const existingPrompt = await Prompt.findById(
            params.id)

        if(!existingPrompt) return new Response("Prompt not found", { status: 404 })

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(
            JSON.stringify(existingPrompt),
            { status: 200 }
        )
    } catch (error) {
        return new Response(
            'Failed to update prompt',
            { status: 500 }
        )
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDatabase();

        await Prompt.findByIdAndDelete(params.id)

        return new Response("Promopt delete successfully", { status: 200 })

    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 })
    }
}