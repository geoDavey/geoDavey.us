import React from "react";

import { PageContent, PageTransitionLink } from "../components/layouts/page";
import SEO from "../components/seo";
import { css } from "@emotion/core";

import Img from "gatsby-image";
import { graphql } from "gatsby";

function Projects(props) {
  return (
    <PageContent width={800} className="md:p-1">
      <SEO title="maps" />

      <div className="maps flex flex-col md:flex-row md:flex-wrap">
        {props.data.allFile.nodes.map((p) => {
          let md = p.childMarkdownRemark;
          let meta = md.frontmatter;

          return (
            <div key={meta.slug} className="post w-full md:p-1 md:w-1/2">
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <Img
                  className="absolute w-full h-full"
                  fluid={meta.image.childImageSharp.fluid}
                  style={{ position: "absolute" }}
                />
                <div className="title absolute bottom-0 w-full">
                  <div className="text-white text-center bg-black bg-opacity-50 font-barlow text-2xl">
                    {meta.title}
                  </div>
                </div>
              </div>
              <div className="flex bg-white text-xs p-1 font-gray-800">
                <div className="flex-grow">{meta.tags.join(" ")}</div>
                <div className="flex-grow text-right">
                  <a href={`https://github.com/${meta.github}`}>
                    view source code
                  </a>{" "}
                  /{" "}
                  <PageTransitionLink to={meta.url}>
                    open map
                  </PageTransitionLink>
                </div>
              </div>

              <div className="text-sm">{meta.blurb}</div>
            </div>
          );
        })}
      </div>
    </PageContent>
  );
}

export default Projects;

export const pageQuery = graphql`
  query {
    allFile(
      filter: { sourceInstanceName: { eq: "maps_md" }, ext: { eq: ".md" } }
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      nodes {
        name
        childMarkdownRemark {
          frontmatter {
            blurb
            date(formatString: "DD MMMM YYYY")
            slug
            tags
            github
            title
            url
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
