import React from "react";

const linkRegex = /!?\[(.+?)]\((.+?)\)/g;
class RichTextFragment extends React.Component {
    render() {
        let { children: text } = this.props;
        const matches = text.match(linkRegex) || [];
        matches.forEach(matchText => {
            const hasMedia = matchText[0] === "!";
            const insideText = matchText.split("[")[1].split("]")[0];
            const link = matchText.split("(")[1].split(")")[0];

            if (hasMedia) {
                text = text.replace(
                    matchText,
                    `<img src="${link}" alt="${insideText}"/>`
                );
                return;
            }

            text = text.replace(
                matchText,
                `<a href="${link}">${insideText}</a>`
            );
        });
        return (
            <span
                dangerouslySetInnerHTML={{ __html: text }}
                class={this.props.class}
            />
        );
    }
}

export default RichTextFragment;
