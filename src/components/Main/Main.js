/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */

import React, { Component } from 'react';
import { Container, Filter, Filters, Table } from './style';
import yokaisJson from '../../yokais';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tribe: [],
            rank: [],
            attribute: [],
            yokais: yokaisJson
        };

        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleCheckbox(event) {
        const checkboxtype = event.target.getAttribute('checkboxtype');
        const type = event.target.name.toLowerCase();
        const { checked } = event.target;
        const filterType = this.state[checkboxtype];

        if (checked) {
            filterType.push(type);
        } else {
            filterType.splice(filterType.indexOf(type), 1);
        }

        this.setState({
            [filterType]: filterType
        });
    }

    render() {
        const { tribe, rank, attribute, yokais } = this.state;
        const tribesCheckbox = [
            'Brave',
            'Charming',
            'Eerie',
            'Heartful',
            'Mysterious',
            'Tough',
            'Slippery',
            'Shady',
            'Wicked'
        ];
        const ranksCheckbox = ['A', 'B', 'C', 'D', 'E'];
        const attributesCheckbox = [
            'Fire',
            'Water',
            'Lightning',
            'Earth',
            'Ice',
            'Wind',
            'Drain',
            'Restoration'
        ];

        return (
            <Container>
                <form>
                    <div>
                        <h5>Filters:</h5>
                    </div>
                    <Filters>
                        <Filter>
                            <h5>Tribes</h5>
                            {tribesCheckbox.map(type => (
                                <div key={type}>
                                    <input
                                        type="checkbox"
                                        checked={tribe.includes(
                                            type.toLowerCase()
                                        )}
                                        name={type}
                                        checkboxtype="tribe"
                                        onChange={this.handleCheckbox}
                                    />
                                    <label htmlFor={type}>{type}</label>
                                </div>
                            ))}
                        </Filter>
                        <Filter>
                            <h5>Ranks</h5>
                            {ranksCheckbox.map(type => (
                                <div key={type}>
                                    <input
                                        type="checkbox"
                                        checked={rank.includes(
                                            type.toLowerCase()
                                        )}
                                        name={type}
                                        checkboxtype="rank"
                                        onChange={this.handleCheckbox}
                                    />
                                    <label htmlFor={type}>{type}</label>
                                </div>
                            ))}
                        </Filter>
                        <Filter>
                            <h5>Attribute</h5>
                            {attributesCheckbox.map(type => (
                                <div key={type}>
                                    <input
                                        type="checkbox"
                                        checked={attribute.includes(
                                            type.toLowerCase()
                                        )}
                                        name={type}
                                        checkboxtype="attribute"
                                        onChange={this.handleCheckbox}
                                    />
                                    <label htmlFor={type}>{type}</label>
                                </div>
                            ))}
                        </Filter>
                    </Filters>
                    <label htmlFor="name">Search by name:</label>
                    <input type="text" id="name" name="name" required />
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Tribe</th>
                                <th>Rank</th>
                                <th>Attribute</th>
                            </tr>
                        </thead>
                        <tbody>
                            {yokais
                                .filter(yokai => {
                                    const isEmptyTribe = tribe.length === 0;
                                    const isEmptyRank = rank.length === 0;
                                    const isEmptyAttribute =
                                        attribute.length === 0;

                                    if (
                                        isEmptyTribe &&
                                        isEmptyRank &&
                                        isEmptyAttribute
                                    ) {
                                        return true;
                                    }

                                    if (
                                        tribe.includes(
                                            yokai.tribe.toLowerCase()
                                        ) &&
                                        isEmptyRank &&
                                        isEmptyAttribute
                                    ) {
                                        return true;
                                    }

                                    if (
                                        isEmptyTribe &&
                                        rank.includes(
                                            yokai.rank.toLowerCase()
                                        ) &&
                                        isEmptyAttribute
                                    ) {
                                        return true;
                                    }

                                    if (
                                        isEmptyTribe &&
                                        isEmptyRank &&
                                        attribute.includes(
                                            yokai.attribute.toLowerCase()
                                        )
                                    ) {
                                        return true;
                                    }

                                    if (
                                        isEmptyTribe &&
                                        rank.includes(
                                            yokai.rank.toLowerCase()
                                        ) &&
                                        attribute.includes(
                                            yokai.attribute.toLowerCase()
                                        )
                                    ) {
                                        return true;
                                    }

                                    if (
                                        tribe.includes(
                                            yokai.tribe.toLowerCase()
                                        ) &&
                                        isEmptyRank &&
                                        attribute.includes(
                                            yokai.attribute.toLowerCase()
                                        )
                                    ) {
                                        return true;
                                    }

                                    if (
                                        tribe.includes(
                                            yokai.tribe.toLowerCase()
                                        ) &&
                                        rank.includes(
                                            yokai.rank.toLowerCase()
                                        ) &&
                                        isEmptyAttribute
                                    ) {
                                        return true;
                                    }

                                    return (
                                        tribe.includes(
                                            yokai.tribe.toLowerCase()
                                        ) &&
                                        rank.includes(
                                            yokai.rank.toLowerCase()
                                        ) &&
                                        attribute.includes(
                                            yokai.attribute.toLowerCase()
                                        )
                                    );
                                })
                                .map(yokai => (
                                    <tr key={yokai.name}>
                                        <td>{yokai.name}</td>
                                        <td>{yokai.tribe}</td>
                                        <td>{yokai.rank}</td>
                                        <td>{yokai.attribute}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </form>
            </Container>
        );
    }
}

export default Main;
