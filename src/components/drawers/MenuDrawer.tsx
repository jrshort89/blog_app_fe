import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import styles from "./MenuDrawer.module.css";

interface MenuDrawerProps {
	isOpen: boolean;
	setIsOpen: any;
}

export const MenuDrawer = ({ isOpen, setIsOpen }: MenuDrawerProps) => {
	return (
		<Drawer anchor="left" open={isOpen} onClose={setIsOpen("left", false)}>
			<Box
				sx={{ width: "15rem", display: "flex", flexDirection: "column" }}
				onClick={() => setIsOpen("left", !isOpen)}
				onKeyDown={setIsOpen("left", false)}
			>
				<hr />
				<Link className={styles.menulink} to="/">
					Home
				</Link>
				<Link className={styles.menulink} to="/flashcards">
					Flashcards
				</Link>
				<Link className={styles.menulink} to="/speech">
					Speech
				</Link>
				<Link className={styles.menulink} to="/settings">
					Settings
				</Link>
			</Box>
		</Drawer>
	);
};
