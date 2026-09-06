import React, { useEffect, useState } from "react";
import sadafBrandHeader from "../assets/sadaf-brand-header.png";

/*
 * SADAF AL-JUBAIL
 * NORMAL COMPANY PROFILE IMAGE VIEWER
 *
 * Uses the 15 approved PNGs directly from:
 * /public/profile/
 *
 * No flip.
 * No slide animation.
 * No PDF rendering engine.
 *
 * One page is displayed at a time with clean Previous / Next
 * controls. The approved PDF remains directly downloadable.
 */

const profilePages = [
  "SADAF_Page_01_Cover_A4_Final_v2.png",
  "SADAF_Page_02_Company_Overview_A4.png",
  "SADAF_Page_03_Vision_Mission_Values_A4_FINAL.png",
  "SADAF_Page_04_Our_Expertise_A4_FINAL.png",
  "SADAF_Page_05_Our_Services_EXACT_APPROVED_ARTWORK.png",
  "SADAF_Page_06_Industries_We_Serve_A4_FINAL_EXACT.png",
  "SADAF_Page_07_Treatment_Service_Methodology_A4_FINAL_EXACT.png",
  "SADAF_Page_08_Quality_Safety_Service_Assurance_A4_FINAL_EXACT.png",
  "SADAF_Page_09_Certifications_Credentials_FINAL.png",
  "SADAF_Page_10_Projects_Case_Studies_FINAL_EXACT.png",
  "SADAF_Page_11_Clients_Industries_Social_Proof_FINAL_EXACT.png",
  "SADAF_Page_12_Client_Testimonials_FINAL_EXACT.png",
  "SADAF_Page_13_Why_Sadaf_FINAL_EXACT.png",
  "SADAF_Page_14_Digital_Service_Management_FINAL_EXACT.png",
  "SADAF_Page_15_Contact_Closing_FINAL_EXACT.png",
];

const PDF_FILE = "/SADAF-Digital-Company-Profile.pdf";
const TOTAL_PAGES = profilePages.length;

function pageUrl(index) {
  return `/profile/${profilePages[index]}`;
}

function CompanyProfileFlipbook({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("profile-viewer-open");

    setCurrentPage(0);
    setFullscreen(false);

    return () => {
      document.body.classList.remove("profile-viewer-open");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const keyboard = (event) => {
      if (event.key === "Escape") {
        if (fullscreen) {
          setFullscreen(false);
        } else {
          onClose();
        }
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setCurrentPage((page) =>
          Math.min(page + 1, TOTAL_PAGES - 1)
        );
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCurrentPage((page) =>
          Math.max(page - 1, 0)
        );
      }
    };

    window.addEventListener("keydown", keyboard);

    return () => {
      window.removeEventListener("keydown", keyboard);
    };
  }, [isOpen, fullscreen, onClose]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen?.();
        setFullscreen(true);
      } else {
        await document.exitFullscreen?.();
        setFullscreen(false);
      }
    } catch {
      setFullscreen((value) => !value);
    }
  };

  if (!isOpen) return null;

  const progress =
    ((currentPage + 1) / TOTAL_PAGES) * 100;

  const isFirst = currentPage === 0;
  const isLast = currentPage === TOTAL_PAGES - 1;

  return (
    <>
      <style>{`
        body.profile-viewer-open {
          overflow: hidden;
        }

        .sadaf-image-profile-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          background:
            radial-gradient(
              circle at 50% 38%,
              #ffffff 0%,
              #f5f7f9 60%,
              #e7ebf0 100%
            );

          font-family:
            Montserrat,
            Arial,
            sans-serif;
        }

        .sadaf-image-profile-header {
          height: 78px;
          min-height: 78px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 28px 0 32px;

          background: #ffffff;

          border-bottom: 3px solid #ed1c24;

          z-index: 10;
        }

        .sadaf-image-profile-header-left {
          display: flex;
          align-items: center;
          gap: 18px;

          min-width: 0;
        }

        .sadaf-image-profile-logo {
          width: 118px;
          height: 52px;

          display: block;

          object-fit: contain;
        }

        .sadaf-image-profile-divider {
          width: 1px;
          height: 34px;

          background: #dce1e8;
        }

        .sadaf-image-profile-title strong {
          display: block;

          color: #082956;

          font-family:
            Oswald,
            Arial,
            sans-serif;

          font-size: 17px;
          font-weight: 600;

          letter-spacing: .035em;
        }

        .sadaf-image-profile-title span {
          display: block;

          margin-top: 4px;

          color: #7c8694;

          font-size: 8px;
          font-weight: 700;

          letter-spacing: .12em;
        }

        .sadaf-image-profile-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sadaf-image-profile-download,
        .sadaf-image-profile-fullscreen,
        .sadaf-image-profile-close {
          height: 36px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border-radius: 2px;

          font-size: 8px;
          font-weight: 800;

          letter-spacing: .07em;

          cursor: pointer;
          text-decoration: none;
        }

        .sadaf-image-profile-download {
          padding: 0 16px;

          background: #ed1c24;
          border: 1px solid #ed1c24;

          color: #ffffff;
        }

        .sadaf-image-profile-download:hover {
          background: #c9151c;
        }

        .sadaf-image-profile-fullscreen {
          padding: 0 14px;

          background: #ffffff;
          border: 1px solid #082956;

          color: #082956;
        }

        .sadaf-image-profile-fullscreen:hover {
          background: #082956;
          color: #ffffff;
        }

        .sadaf-image-profile-close {
          width: 36px;

          background: #ffffff;
          border: 1px solid #ed1c24;

          color: #ed1c24;

          font-size: 18px;
        }

        .sadaf-image-profile-close:hover {
          background: #ed1c24;
          color: #ffffff;
        }

        .sadaf-image-profile-body {
          flex: 1;
          min-height: 0;

          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 18px 92px;

          overflow: hidden;
        }

        .sadaf-image-profile-page {
          height: min(
            78vh,
            820px
          );

          max-height:
            calc(100vh - 150px);

          width: auto;

          max-width:
            calc(100vw - 180px);

          display: block;

          object-fit: contain;

          background: #ffffff;

          border: 1px solid #d9dfe6;

          box-shadow:
            0 18px 42px
            rgba(8,41,86,.15);

          user-select: none;
          -webkit-user-drag: none;
        }

        .sadaf-image-profile-nav {
          position: absolute;

          top: 50%;

          transform:
            translateY(-50%);

          width: 48px;
          height: 48px;

          border-radius: 50%;

          border:
            1px solid
            rgba(8,41,86,.2);

          background:
            rgba(255,255,255,.98);

          color: #082956;

          font-size: 31px;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          z-index: 20;

          box-shadow:
            0 4px 16px
            rgba(8,41,86,.08);
        }

        .sadaf-image-profile-nav:hover:not(:disabled) {
          background: #082956;
          color: #ffffff;
        }

        .sadaf-image-profile-nav:disabled {
          opacity: .22;
          cursor: default;
        }

        .sadaf-image-profile-nav.left {
          left: 24px;
        }

        .sadaf-image-profile-nav.right {
          right: 24px;
        }

        .sadaf-image-profile-bottom {
          height: 52px;
          min-height: 52px;

          background: #ffffff;

          border-top:
            1px solid #dfe4eb;

          display: grid;

          grid-template-columns:
            90px
            1fr
            100px;

          align-items: center;

          gap: 18px;

          padding: 0 25px;
        }

        .sadaf-image-profile-counter {
          color: #6b7584;

          font-size: 10px;
          font-weight: 800;
        }

        .sadaf-image-profile-counter strong {
          color: #ed1c24;

          font-family:
            Oswald,
            Arial,
            sans-serif;

          font-size: 22px;
        }

        .sadaf-image-profile-progress {
          height: 3px;

          background: #dce1e7;

          overflow: hidden;
        }

        .sadaf-image-profile-progress i {
          display: block;

          height: 100%;

          background: #ed1c24;

          transition:
            width .25s ease;
        }

        .sadaf-image-profile-page-number {
          color: #687386;

          text-align: right;

          font-size: 7px;
          font-weight: 800;

          letter-spacing: .09em;
        }

        .sadaf-image-profile-loading {
          position: absolute;
          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          color: #082956;

          font-size: 10px;
          font-weight: 800;
          letter-spacing: .08em;
        }

        @media (max-width: 900px) {
          .sadaf-image-profile-header {
            padding: 0 15px;
          }

          .sadaf-image-profile-title,
          .sadaf-image-profile-divider {
            display: none;
          }

          .sadaf-image-profile-body {
            padding: 12px 58px;
          }

          .sadaf-image-profile-page {
            max-width:
              calc(100vw - 130px);

            max-height:
              calc(100vh - 145px);
          }

          .sadaf-image-profile-nav.left {
            left: 7px;
          }

          .sadaf-image-profile-nav.right {
            right: 7px;
          }
        }

        @media (max-width: 620px) {
          .sadaf-image-profile-header {
            height: 68px;
            min-height: 68px;

            padding: 0 10px;
          }

          .sadaf-image-profile-logo {
            width: 94px;
            height: 44px;
          }

          .sadaf-image-profile-download,
          .sadaf-image-profile-fullscreen {
            height: 32px;
            padding: 0 9px;
            font-size: 7px;
          }

          .sadaf-image-profile-close {
            width: 32px;
            height: 32px;
          }

          .sadaf-image-profile-body {
            padding: 8px 40px;
          }

          .sadaf-image-profile-page {
            max-width:
              calc(100vw - 86px);

            max-height:
              calc(100vh - 125px);
          }

          .sadaf-image-profile-nav {
            width: 38px;
            height: 38px;

            font-size: 25px;
          }

          .sadaf-image-profile-nav.left {
            left: 2px;
          }

          .sadaf-image-profile-nav.right {
            right: 2px;
          }

          .sadaf-image-profile-bottom {
            height: 48px;
            min-height: 48px;

            grid-template-columns:
              70px
              1fr
              70px;

            gap: 8px;

            padding: 0 9px;
          }
        }
      `}</style>

      <div className="sadaf-image-profile-overlay">
        <header className="sadaf-image-profile-header">
          <div className="sadaf-image-profile-header-left">
            <img
              className="sadaf-image-profile-logo"
              src={sadafBrandHeader}
              alt="SADAF Al-Jubail"
            />

            <div className="sadaf-image-profile-divider" />

            <div className="sadaf-image-profile-title">
              <strong>COMPANY PROFILE</strong>
              <span>15-PAGE CORPORATE PRESENTATION</span>
            </div>
          </div>

          <div className="sadaf-image-profile-actions">
            <a
              className="sadaf-image-profile-download"
              href={PDF_FILE}
              download="SADAF-Al-Jubail-Company-Profile.pdf"
            >
              DOWNLOAD PDF
            </a>

            <button
              type="button"
              className="sadaf-image-profile-fullscreen"
              onClick={toggleFullscreen}
            >
              {fullscreen
                ? "EXIT FULLSCREEN"
                : "FULLSCREEN"}
            </button>

            <button
              type="button"
              className="sadaf-image-profile-close"
              onClick={onClose}
              aria-label="Close company profile"
            >
              ×
            </button>
          </div>
        </header>

        <main className="sadaf-image-profile-body">
          <button
            type="button"
            className="sadaf-image-profile-nav left"
            onClick={() =>
              setCurrentPage((page) =>
                Math.max(page - 1, 0)
              )
            }
            disabled={isFirst}
            aria-label="Previous profile page"
          >
            ‹
          </button>

          <img
            className="sadaf-image-profile-page"
            src={pageUrl(currentPage)}
            alt={`SADAF Company Profile Page ${currentPage + 1}`}
            draggable="false"
          />

          <button
            type="button"
            className="sadaf-image-profile-nav right"
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(
                  page + 1,
                  TOTAL_PAGES - 1
                )
              )
            }
            disabled={isLast}
            aria-label="Next profile page"
          >
            ›
          </button>
        </main>

        <footer className="sadaf-image-profile-bottom">
          <div className="sadaf-image-profile-counter">
            <strong>
              {String(
                currentPage + 1
              ).padStart(2, "0")}
            </strong>
            <span> / 15</span>
          </div>

          <div className="sadaf-image-profile-progress">
            <i
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="sadaf-image-profile-page-number">
            PAGE{" "}
            {String(
              currentPage + 1
            ).padStart(2, "0")}
          </div>
        </footer>
      </div>
    </>
  );
}

export default CompanyProfileFlipbook;