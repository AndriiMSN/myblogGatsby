import React, { Component } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import blogStyles from './blog.module.scss'
import Head from '../components/head'



const BlogPage = () => {
  const data = useStaticQuery(graphql`
  query{
    allContentfulBlogPost(
      sort:{
        fields:publishedDate,
        order:DESC
      }
      filter:{node_locale:{eq:"en-US"}}
    ){
      edges{
        node{
          title
          slug
          publishedDate(formatString:"MMM Do, YYYY")
					# image{file{url}}
          location{lat, lon}
          breed
					find
          }
        }
      }
    }
  `)
  console.log(data);
  // const token = 'pk.eyJ1IjoiYW5kcmlpbXNuIiwiYSI6ImNrZGYzZ200YTJudXQyeHNjMjk2OTk2bjUifQ.njqMX6x6U946yjJdWwA7mA';
  // async function getAdress(lot, lan) {
  //   const api_url = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lot},${lan}.json?access_token=${token}`)
  //   const dataAdress = await api_url.json()
  //   console.log(dataAdress);
  // }
  // let getAdress = async (x, y) => {
  //   const api_url = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${x},${y}.json?access_token=${token}`)
  //   const dataAdress = await api_url.json()
  //   console.log(dataAdress);
  // }
  return (
    <Layout>
      <Head title='Blog' />
      <h1>Blog</h1>
      <ol className={blogStyles.posts}>
        {
          data.allContentfulBlogPost.edges.map((edge) => {
            return (

              <li>
                <Link to={`/blog/${edge.node.slug}`}>
                  <div style={{ backgroundColor: "pink" }} /*style={(edge.node.image) ? ({ backgroundImage: `url("${edge.node.image.file.url}")` }) : ({ backgroundImage: `url("https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036__340.jpg")` })}*/>
                    <h2>
                      {edge.node.title}
                    </h2>
                    <p>
                      {edge.node.publishedDate}
                    </p>
                    <p>
                      Порода: {edge.node.breed}
                    </p>
                    <p>
                      Статус: <span>{(edge.node.find) ? 'Найден' : 'Потерян'}</span>
                    </p>
                    <p>
                    </p>
                  </div>
                </Link>

              </li>
            )
          })
        }
      </ol>
    </Layout >
  )
}

export default BlogPage