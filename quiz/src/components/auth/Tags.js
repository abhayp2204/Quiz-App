import React, { useContext } from "react"
import "../../css/Register.css"
import { taglist } from "../../data/tags"
import { random } from "../../functions"

function Tags(props) {
    const { selectedTags, setSelectedTags } = props

    const colors = [
        "#ED254E",
        // "#F4FFFD",
        "#1EFFBC",
        "#C2E812",
        "#F17105",
        "#6610F2",
        "#7B1E7A",
    ]

	return (
		<div className="tag-container">
                {taglist.map((tag, index) => {
                    const selected = selectedTags.includes(tag)
                    const styles = {
                        backgroundColor: selected? "black" : colors[random(colors.length)],
                        color: selected? "white" : "black",
                        border: selected? "3px solid white" : "none",
                    }   

                    return (
                        <div
                            className="tag"
                            key={index}
                            style={styles}
                            onClick={() => {setSelectedTags([...selectedTags, tag])}}
                        >
                            {tag}
                        </div>
                    )
                })}
            </div>
	)
}

export default Tags
