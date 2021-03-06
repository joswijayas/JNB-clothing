import React, { useEffect, useState } from 'react';
import {CircularProgress, Grid, Typography} from '@material-ui/core';
import Product from './Product/Product';
import { IProductItem } from '../../interfaces';
import { commerce } from '../../lib/commerce';
import { useParams } from 'react-router-dom';

interface IProducts{
    products : IProductItem[];
    onAddToCart : Function;
}



const Products = (productsInterface:IProducts) =>{
    const [products, setProducts] = useState(productsInterface.products);
    const [loading, setLoading] = useState(false);
    const category = useParams().category;
    const fetchProducts = async (slug:string) => {
        const { data } = await commerce.products.list({
            category_slug:  [slug]
          });
        setProducts(data);
    }

    const timeout = () =>{
        setTimeout(() =>{
        setLoading(true);
        },2000);
    }

    useEffect(()=>{
        timeout();
        if(category!=='all'){
            fetchProducts(category as string);
        }else{
            setProducts(productsInterface.products);
        }
    },[category])
    return ( loading ? (
        <>
        <Typography variant="h6" gutterBottom> category </Typography>
        <Grid container justify="center" spacing={1}>
            {
                products.map((product) => (
                    <Grid style={{marginInline:'auto'}} item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product onAddToCart={productsInterface.onAddToCart} product={product} />
                    </Grid>
                ))
            }
            {/* <Pagination count={10} color="primary" /> */}
        </Grid>
        </>) : (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',}}>
      <CircularProgress />
    </div>
  )
    )

}

export default Products;