import Box from "@mui/material/Box";

export default function IconBox({
  iconUrl,
  iconColor = "currentcolor",
  iconMarginRight = "0px",
  iconWidth = "24px",
}) {
  return (
    <Box
      component="span"
      sx={{
        width: iconWidth,
        height: iconWidth,
        marginRight: iconMarginRight,
        backgroundColor: iconColor,
        mask: `url(${iconUrl}) center center / contain no-repeat`,
      }}
    />
  );
}
