# DS519 Assignment 5 Azure QueueFunctionApp

This repository contains the fully functional Azure function app handle the uploaded picture and processing it.

The [HTTP trigger](./ass5httpTrigger) contains a Azure function to add the blob storage link within "assignment5storage1" to the queue.

The [queue trigger](./ass5queueTrigger) contains a Azure function to get the blob storage link from the queue, access the blob storage to get the picture, using Azure vision to get image text information , and store the content into a cosmos db.
