import React, { useState, useRef, useEffect } from "react";

import { MapContent } from "../page";
import SEO from "../seo";

import PyreneesMap from "@geodavey/gl-pyrenees";
import { connect } from "react-redux";
import { graphql } from "gatsby";

const mapStateToProps = ({ isLoadingSuppressed }) => {
  return { isLoadingSuppressed };
};

export default connect(mapStateToProps)((props) => {
  let mapRef = useRef();

  // if loading is suppressed by user, fire fake loading event
  // will cause map controls to render even before real load
  useEffect(() => {
    if (props.isLoadingSuppressed && mapRef.current) {
      mapRef.current.getMap().fire("load", { fake: true });
    }
  }, [props.isLoadingSuppressed]);

  // release the map to be navigated after 5 seconds of loading
  // or if all assets load, whichever is first
  useEffect(() => {
    setTimeout(() => {
      mapRef.current.getMap().fire("load", { fake: true });
    }, 5000);
  }, []);

  return (
    <MapContent>
      <SEO title="/now/"></SEO>
      <PyreneesMap
        ref={mapRef}
        zoom={11.5}
        data={{
          tracks: {
            type: "FeatureCollection",
            features: props.data.allTracks.nodes,
          },
          updates: {
            type: "FeatureCollection",
            features: props.data.allUpdates.nodes,
          },
        }}
        baseDataURL="https://gl-pyrenees.geodavey.us"
        onLoad={(e) => props.dispatch({ type: "TRANSITION_END" })}
      />
    </MapContent>
  );
});

export const pageQuery = graphql`
  query {
    allUpdates {
      nodes {
        type
        properties {
          caption
          photo
          date
        }
        geometry {
          coordinates
          type
        }
      }
    }
    allTracks {
      nodes {
        geometry {
          coordinates
          type
        }
        type
      }
    }
  }
`;
