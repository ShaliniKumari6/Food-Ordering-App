import { useEffect , useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeal.module.css"
import MealItem from "./MealsItem/MealItem";



const AvailableMeal = (props) => {
    const [meals, setMeals]= useState([]);
    const [isLoading, setIsLoading]=useState(true);
    const [httpError, setHttpError]=useState(false);

    useEffect(()=>{
        const fetchMeal=async()=>{
            const response= await fetch("https://indian-meals-default-rtdb.firebaseio.com/meal.json");
            const responseData= await response.json();

            if(!response.ok){
                throw new Error("Something went Wrong!!!");
            }

            const loadedMeals=[];
            for (const key in responseData){
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        }
    
        fetchMeal().catch(error=>{
            setIsLoading(false);
            setHttpError(error.message);
        });
        
        
        
    },[])
    if(isLoading){
        return <section className={styles.mealsLoading}>
            <p>Loading.... Please Wait.....</p>
        </section>
    }

    if(httpError){
        return <section className={styles.mealsError}>
            <p>{httpError}</p>
        </section>
    }

    const mealsList = meals.map(meal =>
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />);
    return (
        <section className={styles.meals}>
            <Card >
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
}
export default AvailableMeal;