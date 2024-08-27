import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { IconButton, Paper, Box, Avatar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useScript } from "../hooks";
import kakaoIcon from "../../../assets/images/kakaoIcon.png";
import LinkIcon from "@mui/icons-material/Link";
export default function ShareLinkButtons() {
  const [shareButtonPopState, setShareButtonPopState] = useState(false);
  const location = useLocation();

  const url = `http://localhost:3000${location.pathname}`;

  const kakaoKey = process.env.REACT_APP_KAKAO_API_KEY;

  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");

  // kakao sdk 초기화하기
  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도.
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        window.Kakao.init(kakaoKey);
      }
    }
  }, [status]);

  const handleKakaoShare = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: url,
    });
  };

  const handleShareButtonPopUp = () => {
    setShareButtonPopState((prev) => !prev);
  };

  return (
    <Box className="share-button-container" sx={{ display: "flex", position: "relative" }}>
      <IconButton onClick={handleShareButtonPopUp}>
        <ShareIcon />
      </IconButton>
      {shareButtonPopState && (
        <Paper
          sx={{
            position: "absolute",
            transform: "translate(-50%, 2.5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            zIndex: 10,
          }}
        >
          <span>클릭해서 공유하기</span>
          <Box sx={{ display: "flex", marginTop: 1, justifyItems: "center", alignItems: "center", width: "100%" }}>
            <CopyToClipboard text={url}>
              <IconButton sx={{ width: 40, height: 40, backgroundColor: "skyblue", borderRadius: "50%", marginRight: 1 }} onClick={() => { alert("복사완료!"); }}>
                <LinkIcon />
              </IconButton>
            </CopyToClipboard>
            <FacebookShareButton url={url}>
              <IconButton>
                <FacebookIcon style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
              </IconButton>
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <IconButton>
                <TwitterIcon style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
              </IconButton>
            </TwitterShareButton>
            <LineShareButton url={url}>
              <IconButton>
                <LineIcon style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
              </IconButton>
            </LineShareButton>
            <TelegramShareButton url={url}>
              <IconButton>
                <TelegramIcon style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
              </IconButton>
            </TelegramShareButton>
            <IconButton onClick={handleKakaoShare}>
              <Avatar src={kakaoIcon} alt="Kakaotalk Icon" sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
