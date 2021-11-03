import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, ThemeProvider } from '@mui/styles';
import { Theme } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useGetSession } from '../UtilityHooks/AuthHooks';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'; //fix colours
import Typography from '@mui/material/Typography';
import { theme } from "../../components/Theme"


const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        root: {
            width: '100%',
            backgroundColor: '#FFFFFF',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
        },
        GridContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%'
        },
        GridItem: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        ListItem: {
            backgroundColor: "#d7d7d7",
            "&:hover": {
                backgroundColor: "#b7b7b8",
                color: "white"
            }
        },
        ListItemText: {
            color: "#4D4A49",
        },
        MenuItemOptionValues: {
            justifyContent: "center",
            alignItems: "flex-start",
        },
        MenuItemDescription: {
            width: '600px',
            padding: '15px',
        },
        Button: {
            padding: '15px',
        },
        MenuItemOptionValue: {
            ml: '100px',
        }
    })
))

const EditMenuPage: React.FC = () => {
    //ran at initiation
    useEffect(() => {
        getMenuItems()
    }, [])

    const classes = useStyles()
    const getSession = useGetSession()
    const [menuItems, setMenuItems] = useState<any[]>([])
    const [editItem, setEditItem] = useState('')
    let editingMenuItem = {}

    const getMenuItems = async () => {
        const { cognitoId, jwtToken } = await getSession(true)
        const getOrdersUrl = `https://biteapp.work/retail/api/menu/get/${cognitoId}`

        await axios.get(getOrdersUrl, { headers: { AUTHORIZATION: `Bearer ${jwtToken}` } })
            .then(res => {
                setMenuItems(res.data.data)

            })
            .catch(error => console.log(error))
    };

    console.log(menuItems)

    const addMenuItem = () => {
        let newMenuItem = {
            "name": "",
            "description": "",
            "menuItemOption": [

            ]
        }
        setMenuItems(menuItems => [...menuItems, newMenuItem])
        setEditItem((menuItems.length - 1).toString())
    };

    const addMenuItemOption = (menuItemIndex) => {
        let newMenuItemOption = {

            "menuItemOptionId": "",
            "menuItemId": "",
            "name": "",
            "menuItemOptionValue": [
                {
                    "name": "",
                    "price": ""
                }
            ]
        }

        setMenuItems(menuItems.map((menuItem) => {
            console.log(menuItem)
            if (menuItem.menuItemId !== menuItemIndex + 1) {
                return menuItem
            } else {
                menuItem.menuItemOption.push(newMenuItemOption)
                return menuItem
            }
        }))
    };

    const addMenuItemOptionValue = (menuItemOptionIndex, menuItemIndex) => {
        let newMenuItemOptionValue = {
            "name": "",
            "price": ""
        }

        let newMenuItems = menuItems.map((menuItem) => {
            if (menuItem.menuItemId !== menuItemIndex + 1) {
                return menuItem
            } else {
                menuItem.menuItemOption[menuItemOptionIndex].menuItemOptionValue.push(newMenuItemOptionValue)
                return menuItem
            }
        })

        console.log(newMenuItems)
        setMenuItems(newMenuItems)
    };

    const handleItemNameChange = (value) => {
        setMenuItems(menuItems => {
            let tempMenuItems = menuItems
            tempMenuItems[editItem].name = value
            return [...tempMenuItems]
        })
    }

    const handleItemDescriptionChange = (value) => {
        setMenuItems(menuItems => {
            let tempMenuItems = menuItems
            tempMenuItems[editItem].description = value
            return [...tempMenuItems]
        })
    }

    const handleItemOptionChange = (value, menuItemOptionIndex) => {
        setMenuItems(menuItems => {
            let tempMenuItems = menuItems
            tempMenuItems[editItem].menuItemOption[menuItemOptionIndex].name = value
            return [...tempMenuItems]
        })
    }

    const handleItemOptionValueChange = (value, menuItemOptionIndex, menuItemOptionValueIndex) => {
        setMenuItems(menuItems => {
            let tempMenuItems = menuItems
            tempMenuItems[editItem].menuItemOption[menuItemOptionIndex].menuItemOptionValue[menuItemOptionValueIndex].name = value
            return [...tempMenuItems]
        })
    }

    const handleItemOptionValuePriceChange = (value, menuItemOptionIndex, menuItemOptionValueIndex) => {
        setMenuItems(menuItems => {
            let tempMenuItems = menuItems
            tempMenuItems[editItem].menuItemOption[menuItemOptionIndex].menuItemOptionValue[menuItemOptionValueIndex].price = value
            return [...tempMenuItems]
        })
    }

    useEffect(() => {
        console.log('DOM updated')
    })

    const createMenuItemCell = (menuItem, menuItemIndex) => {

        const menuItemOptions = menuItem.menuItemOption.map((menuItemOption, menuItemOptionIndex) =>
            createMenuItemOptionCell(menuItemOption, menuItemOptionIndex, menuItem, menuItemIndex)
        )

        return (
            <Grid item key={menuItem.menuItemId}>
                <Grid container direction="column" alignItems="flex-start" spacing={2}>
                    <Grid container direction="row" alignItems="flex-start" spacing={2}>
                        <Grid item>
                            <TextField
                                className={classes.MenuItemDescription}
                                disabled={!(editItem === menuItemIndex)}
                                required
                                id="outlined-required"
                                label="Item Name"
                                value={menuItem.name}
                                variant="outlined"
                                onChange={(event) => handleItemNameChange(event.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                className={classes.Button}
                                variant="contained"
                                onClick={() => {
                                    setEditItem(menuItemIndex)
                                    editingMenuItem = menuItems[menuItemIndex]
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                className={classes.Button}
                                variant="contained"
                                onClick={() => {
                                    setEditItem('')
                                }}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.MenuItemDescription}
                            disabled={!(editItem === menuItemIndex)}
                            required
                            id="outlined-required"
                            label="Item Description"
                            value={menuItem.description}
                            variant="outlined"
                            onChange={(event) => handleItemDescriptionChange(event.target.value)}
                        />

                    </Grid>

                    <Grid container direction="column" spacing={4}>
                        {menuItemOptions}
                    </Grid>
                    {editItem === menuItemIndex &&
                        <Grid item><Button
                            className={classes.Button}
                            variant="contained"
                            onClick={() => addMenuItemOption(menuItemIndex)}
                        >
                            Add Item Option
                        </Button>
                        </Grid>
                    }
                </Grid>

            </Grid>
        )
    }

    const createMenuItemOptionCell = (menuItemOption, menuItemOptionIndex, menuItem, menuItemIndex) => {
        const menuItemOptionValues = menuItemOption.menuItemOptionValue.map((menuItemOptionValue, menuItemOptionValueIndex) =>
            createMenuItemOptionValueCell(menuItemOptionValue, menuItemOptionValueIndex, menuItem, menuItemOptionIndex, menuItemIndex)
        )

        return (
            <Grid item key={menuItemOption.menuItemOptionId}>
                <Grid item>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <TextField
                                disabled={!(editItem === menuItemIndex)}
                                required
                                id="outlined-required"
                                label="Item Option Type"
                                value={menuItemOption.name}
                                variant="outlined"
                                onChange={(event) => handleItemOptionChange(event.target.value, menuItemOptionIndex)}
                            />
                        </Grid>
                        <Grid container direction="column" spacing={2}>
                            {menuItemOptionValues}
                        </Grid>
                        {editItem === menuItemIndex &&
                            <Grid item>
                                <Button
                                    className={classes.Button}
                                    variant="contained"
                                    onClick={() => addMenuItemOptionValue(menuItemOptionIndex, menuItemIndex)}
                                >
                                    Add Item Option Value
                                </Button>
                            </Grid>
                        }
                    </Grid>
                </Grid>

            </Grid>
        )
    }

    const createMenuItemOptionValueCell = (menuItemOptionValue, menuItemOptionValueIndex, menuItem, menuItemOptionIndex, menuItemIndex) => {
        return (
            <Grid item className={classes.MenuItemOptionValue} key={menuItemOptionValue.menuItemOptionValueId}>
                <Grid container direction="row" spacing={2}>
                    <Grid item>
                        <TextField
                            disabled={!(editItem === menuItemIndex)}
                            required
                            id="outlined-required"
                            label="Item Option"
                            value={menuItemOptionValue.name}
                            variant="outlined"
                            onChange={(event) => handleItemOptionValueChange(event.target.value, menuItemOptionIndex, menuItemOptionValueIndex)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            disabled={!(editItem === menuItemIndex)}
                            required
                            id="outlined-required"
                            label="Price ($)"
                            value={menuItemOptionValue.price}
                            variant="outlined"
                            onChange={(event) => handleItemOptionValuePriceChange(event.target.value, menuItemOptionIndex, menuItemOptionValueIndex)}
                        />
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <div className={classes.root}>
            <Grid container className={classes.GridContainer} spacing={2} >
                <Grid item className={classes.GridItem}>
                    <Grid container direction="column" alignItems="flex-start" spacing={6}>
                        <Grid item>
                            <Typography variant="h4" gutterBottom>
                                Edit your menu
                            </Typography>
                        </Grid>
                        {editItem === '' ? menuItems.map(
                            (menuItem, index) =>
                                createMenuItemCell(menuItem, index)
                        ) : createMenuItemCell(menuItems[editItem], editItem)
                        }
                    </Grid>
                    {editItem === '' && <Button
                        className={classes.Button}
                        variant="contained"
                        onClick={() => addMenuItem()}
                    >
                        Add Menu Item
                    </Button>}
                </Grid>
            </Grid>
        </div>
    );
}

export default EditMenuPage;
