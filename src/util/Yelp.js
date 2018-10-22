const api_key = 'e_YSwsjrlAqr5LteJR0aHpCjhJvcHmCOgNTB15a5b-wokTRmxB9uqgu4PqtHniQO28yZQlahasWJ2yuWdjcxrsB9AsP4KKscGFp2uLzdVHmcXnZCi3GLs-xLtFTNW3Yx';

const Yelp = {
    search(term, location, sortBy){
        console.log(term)
        console.log(location)
        console.log(sortBy)
            return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
            {headers: 
                {Authorization: `Bearer ${api_key}`}
            }).then(response => {
                return response.json();
            }).then(jsonResponse=>{
            if(jsonResponse.businesses){
                return jsonResponse.businesses.map(business=>{
                    return {                    
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories.title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    };
                })
            }
        });
    }
}

export default Yelp;