import { expect } from "chai";
import { ethers } from "hardhat";
import { Campaign, CrowdFunding } from "../typechain-types";
import CampainArtifact from "../artifacts/contracts/Campaign.sol/Campaign.json";

const toEther = (val: string) => ethers.utils.parseUnits(val);

const fromEther = (val: string) => ethers.utils.formatEther(val);

const wait = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

describe("Crowd Funding", () => {
  let CrowdFunding;
  let crowdFunding: CrowdFunding;
  let Campaign;
  let campaign: Campaign;

  let john: any, bob: any, doe: any, alis: any;

  it("should able to deploy the campaign", async () => {
    [john, doe, bob, alis] = await ethers.getSigners();

    CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    crowdFunding = await CrowdFunding.deploy();
  });

  it("should able to create campagin", async () => {
    const target = ethers.utils.parseEther("2");
    const startAt = Date.now();
    const endAt = Date.now() + 1;
    const dataURI = "https://www.youtube.com/";

    await crowdFunding.createCampaign(target, startAt, endAt, dataURI);

    const campagins = await crowdFunding.getCampaigns();

    expect(campagins).to.length(1);
  });

  it("should able to get the campaign", async () => {
    const campaignes = await crowdFunding.getCampaigns();

    Campaign = await ethers.getContractAtFromArtifact(
      CampainArtifact,
      campaignes[0]
    );

    campaign = <Campaign>await Campaign.deployed();

    expect(
      campaign.manager === john.address,
      "Campaign manager and deployed user not match!"
    );
  });

  it("should able to fund", async () => {
    let [
      manager,
      startAt,
      endAt,
      target,
      raisedAmount,
      dataURI,
      noOfContributors,
      minContribution,
    ] = await campaign.getInfo();

    expect(raisedAmount, "Raised amount is not 0").to.eq(toEther("0"));

    expect(
      noOfContributors.toNumber(),
      "No of contributors is not match!"
    ).to.equal(0);

    await campaign.connect(doe).fund({ value: toEther("1") });

    await campaign.connect(bob).fund({ value: toEther("1") });

    [
      manager,
      startAt,
      endAt,
      target,
      raisedAmount,
      dataURI,
      noOfContributors,
      minContribution,
    ] = await campaign.getInfo();

    expect(noOfContributors.toNumber()).to.eq(2);

    expect(raisedAmount, "Raised amount is not 0").to.eq(toEther("2"));

    const contributors = await campaign.getAllContributors();

    expect(contributors.length).to.eq(2);
  });

  describe("Refund", () => {
    it("should able to revert if deadline has not passed", async () => {
      await wait(2000);

      await expect(campaign.connect(doe).refund()).to.be.revertedWith(
        "Deadline has not passed!"
      );
    });
  });

  describe("Request", () => {
    const dataURI = "http://";
    const value = toEther("1");

    it("should only manager can do this", async () => {
      await expect(
        campaign.connect(doe).createRequest(john.address, value, dataURI)
      ).to.be.revertedWith("You are not manager of this campaign!");
    });

    it("should able to create request", async () => {
      const dataURI = "http://";
      const value = toEther("1");
      await campaign.connect(john).createRequest(doe.address, value, dataURI);
    });
  });

  describe("Vote", () => {
    it("shoulb be reverted for invalid request no", async () => {
      await expect(campaign.connect(doe).vote(78)).to.be.revertedWith(
        "Request number is not valid!!"
      );
    });

    it("should be reverted for not begin contributor", async () => {
      await expect(campaign.connect(alis).vote(0)).to.be.revertedWith(
        "You are not contributor please contribute first!"
      );
    });

    it("should able to vote for doe", async () => {
      await expect(campaign.connect(doe).vote(0)).to.emit(campaign, "voted");
    });

    it("should be reverted if already voted", async () => {
      await expect(campaign.connect(doe).vote(0)).to.be.revertedWith(
        "You have already voted!!"
      );
    });

    it("should able to vote for bob", async () => {
      // await expect(campaign.connect(bob).vote(0)).to.emit(campaign, "voted");
    });
  });

  describe("Finalize", () => {
    it("should revert if not manager", async () => {
      await expect(campaign.connect(doe).finalizeRequest(0)).to.be.revertedWith(
        "You are not manager of this campaign!"
      );
    });

    // it("should revert if target not reach", async () => {
    //   await expect(
    //     campaign.connect(john).finalizeRequest(0)
    //   ).to.be.revertedWith("Target amount has not been reached yet!");
    // });

    it("shoule be reverted for invalid request no", async () => {
      await expect(
        campaign.connect(john).finalizeRequest(78)
      ).to.be.revertedWith("Request number is not valid!!");
    });

    // it("should be reverted if majority votes has been not reached", async () => {
    //   await expect(
    //     campaign.connect(john).finalizeRequest(0)
    //   ).to.be.revertedWith("Majority votes has not been reached!");
    // });

    it("should be able to finalize", async () => {
      await expect(campaign.connect(john).finalizeRequest(0)).to.emit(
        campaign,
        "finalized"
      );
    });

    it("should be reverted with already completed", async () => {
      await expect(
        campaign.connect(john).finalizeRequest(0)
      ).to.be.revertedWith("Request is already completed!");
    });
  });
});
