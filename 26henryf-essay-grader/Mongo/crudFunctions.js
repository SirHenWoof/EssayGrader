import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
export async function connectToCluster(uri) {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
 
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }
export async function executeEssayPost(name, grade) {
    config();
    const uri = process.env.DB_URI;
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('EssayGrades');
        const collection = db.collection('Grades');
 
        console.log('Create Essay Post');
        await createEssayPost(collection, name, grade);
        await mongoClient.close();
    } finally {
    }
 }
 //Collection, Name, Grade
 export async function createEssayPost(collection, name, grade) {
    let tmnow = Date.now()
    const essayPost = {
        _id: name + tmnow,
        Name: name,
        Grade: grade,
        Date: tmnow,
    };
 
    await collection.insertOne(essayPost);
 }