
import { string } from "zod";
import {z} from Zod;
const userSchema = z.object({
    id:z.string(),
    email:z.string(),
    fullName: z.string(),
    costumerId:z.string(),
    
})