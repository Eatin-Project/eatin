import { Test } from "@nestjs/testing";
import { RecipesService } from "./recipes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Recipes } from "./recipes.model";

const shirleyUserId = "6Vhy5V9MCNRwMe7IBoB5b2eDcZF3";

describe("RecipesService", () => {
    let recipesService: RecipesService;
    let app: any;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: "postgres",
                    host: "10.10.248.108",
                    port: 5432,
                    username: "eatin",
                    password: "eatin",
                    database: "postgres",
                    entities: [Recipes],
                    synchronize: false,
                }),
                TypeOrmModule.forFeature([Recipes]),
            ],
            providers: [RecipesService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        recipesService = module.get<RecipesService>(RecipesService);
    });

    afterAll(async () => {
        await app.close();
    });

    describe("findOne", () => {
        it("should return a specific recipe for a given index and user ID", async () => {
            const recipeIndex = 8025;
            const expectedRecipe = {
                author: "Shirley Chesner",
                category: "Drink Recipes",
                cook_time: 0,
                course: "Main Course",
                cuisine: "Jewish",
                description: "Water with delicious cucumber slices and a touch of mint ",
                diet: "Vegetarian",
                difficulty: "Easy",
                image: "https://firebasestorage.googleapis.com/v0/b/eatin-c7074.appspot.com/o/recipesImages%2F312e02990a11406eb2ecb82a80dacd47-01?alt=media&token=cda43c21-7339-40e6-af77-98da34f9cf7b",
                index: 8025,
                ingredients: '["1 cup Water","1 cucumber sliced", "Mint"]',
                instructions:
                    '["Get a cup","Pour water into the cup", "Slice the cucumber", "Add the cucumber slices and mint to the cup"]',
                prep_time: 1,
                recipe_title: "Cucumber Mint Water",
                record_health: "good",
                tags: '["water"]',
                total_time: 1,
                url: "https://nope.com",
            };

            const { is_saved, is_uploaded, rating, vote_count, ...recipe } =
                (await recipesService.findOne(recipeIndex, shirleyUserId)) || {};

            expect(recipe).toEqual(expectedRecipe);
        });
    });

    describe("getRecipeFieldOptions", () => {
        it("should return distinct recipe field options for a given field and value", async () => {
            const field = "category";
            const value = "egg";
            const expectedOptions = ["Egg Recipes", "Scrambled Egg Recipe"];

            const options = await recipesService.getRecipeFieldOptions(field, value);

            expect(options).toEqual(expectedOptions);
        });
    });
});
