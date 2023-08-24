// packages
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// custom imports
import Card from "../components/Card";
import Filter from "../components/Filter";
import Modal from "../components/Modal";
import { SharedCtx } from ".";
import { IFeatures, Tags, fetchFeatures, upvoteFeature } from "../api/features";
import { showPopup } from "../components/Message";

// styles
import "../styles/index.css";

interface IRoadMapProps {
  token: string;
  showTags?: boolean;
  showFilter?: boolean;
  collectFeedback?: boolean;
  cardStyle?: React.CSSProperties | undefined;
}

function RoadMap({
  token,
  collectFeedback = false,
  showTags = false,
  showFilter = true,
  cardStyle,
}: IRoadMapProps) {
  // core states
  const [featureList, setFeatureList] = useState<IFeatures[]>([]);
  const [activeFilter, setActiveFilter] = useState<Tags>(Tags.ALL);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  // modal states
  const [upvoteModal, setUpvoteModal] = useState<boolean>(false);

  // dependency hooks & variables
  const upvoteSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const upVoteForm = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: () => {},
    validationSchema: upvoteSchema,
  });

  useEffect(() => {
    fetchFeatures(token)
      .then((features) => setFeatureList(features))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // filter function helpers
  const filteredFeat = featureList?.filter((v) => {
    if (activeFilter === Tags.ALL) {
      return true;
    }

    return v?.tags?.includes(activeFilter);
  });

  // upvote modal helpers
  const toggelEmailModal = () => setUpvoteModal(!upvoteModal);
  
  const incrementVote = ()=>{
    let currFeature = [...featureList];
    currFeature = currFeature?.map((feature) => {
      if (feature.id === selectedFeature) {
        feature.upvotes += 1;
      }
      return feature;
    });

    setFeatureList(currFeature);
  }

  const submitVote = () => {
    if (selectedFeature) {
      upvoteFeature(selectedFeature, upVoteForm.values.email)
        .then(() => {
          incrementVote();
          toggelEmailModal();
          upVoteForm.resetForm();
          showPopup({ message: "Successfully voted", type: "success" });
        })
        .catch((err) => {
          toggelEmailModal();
          upVoteForm.resetForm();
          showPopup({ message: err?.message, type: "error" });
        });
    }
  }


  return (
    <SharedCtx.Provider
      value={{
        activeFilter,
        setActiveFilter,
        selectedFeature,
        setSelectedFeature,
        featureList,
        setFeatureList,
      }}
    >
      <div>
        {/* filter */}
        {showFilter && <Filter />}

        {/* feedback btn */}
        {collectFeedback && <button>Request Feature</button>}

        {/* cards */}
        {filteredFeat?.map((val) => {
          return (
            <Card
              key={val?.id}
              upvote={val?.upvotes}
              tags={val?.tags}
              featureName={val?.feature}
              featureId={val?.id}
              cardStyle={cardStyle}
              showTags={showTags}
              toggleModal={toggelEmailModal}
            />
          );
        })}

        {/* email modal */}
        <Modal
          visible={upvoteModal}
          disable={!!upVoteForm.errors.email}
          onOk={submitVote}
          onCancel={() => {
            setUpvoteModal(false);
          }}
          title="Upvote Now"
        >
          <input
            placeholder="Your Email"
            name="email"
            type="email"
            style={{ borderColor: upVoteForm.errors.email ? "red" : "",marginTop:"auto" }}
            value={upVoteForm.values.email}
            onChange={upVoteForm.handleChange}
          />
        </Modal>

        {/* modal */}
        <Modal
          visible={false}
          onCancel={() => {}}
          onOk={() => {}}
          title="Submit your feedback"
        >
          <input placeholder="Enter your feedback" />
          <input placeholder="Your Email" type="email" />
        </Modal>
      </div>
    </SharedCtx.Provider>
  );
}

export default RoadMap;
