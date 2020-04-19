import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

import { point, featureCollection } from "@turf/helpers";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "../styles/map.scss";

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      geophotos: this.getGeophotosGeoJSON(this.props.data.allCloudinaryMedia),
    };
  }

  getGeophotosGeoJSON(allCloudinaryMedia) {
    // turn graphQL response into GeoJSON

    var geophotosFeatures = allCloudinaryMedia.nodes.map((n) => {
      let properties = {
        public_id: n["public_id"],
        alt: n["context"]["custom"]["alt"],
        caption: n["context"]["custom"]["caption"],
        tags: n["tags"],
      };

      // create feature point geometry
      let latlon = n["context"]["custom"]["latlon"].split(",").map((l) => {
        return parseFloat(l);
      });

      return point(latlon, properties);
    });

    return featureCollection(geophotosFeatures);
  }

  cloudinaryURL(id, transformations = "q_auto,f_auto") {
    return `https://res.cloudinary.com/geodavey/image/upload/${transformations}/${id}.jpg`;
  }

  render() {
    return (
      <Layout>
        <SEO title="map" />
        {this.state.geophotos.features.map((f) => {
          return (
            <div key={f.properties.id}>
              <img
                alt={f.properties.name}
                src={this.cloudinaryURL(
                  f.properties.public_id,
                  "w_256,ar_1:1,c_fill,g_auto"
                )}
              />
            </div>
          );
        })}
      </Layout>
    );
  }
}

export default Map;

export const pageQuery = graphql`
  query {
    allCloudinaryMedia(filter: { public_id: { glob: "geophotos/*" } }) {
      nodes {
        secure_url
        public_id
        tags
        context {
          custom {
            alt
            caption
            latlon
          }
        }
      }
    }
  }
`;
