import {Observation, registerResource} from "midata";


@registerResource('resourceType','MSCogTestSDPrep')
export class MSCogTestSDPrep extends Observation {
    constructor() {
        let code = {
            coding: [
                {
                    system: "http://midata.coop",
                    code: "MSCogTestSDPrep",
                    display: "MS Kognitionstest Symbol-Digit Probelauf"
                }
            ]
        };

        super({_dateTime: new Date().toISOString()}, code, {
            coding: [{
                system: 'http://hl7.org/fhir/observation-category',
                code: 'survey',
                display: 'Survey'
            }],
            text: 'Survey'

        });

    }


    addNbCorrect(correctAssignmentAmount: number) {

        super.addComponent({
            code: {
                coding: [{
                    system: "http://midata.coop/MSCogTestSDPrep",
                    code: "NbCorrect",
                    display: "Anzahl korrekte Zuordnungen"
                }]
            },
            valueQuantity: {
                value: correctAssignmentAmount
            }
        })

    }

    addNbIncorrect(incorrectAssignmentAmount: number) {

        super.addComponent({
            code: {
                coding: [{
                    system: "http://midata.coop/MSCogTestSDPrep",
                    code: "NbIncorrect",
                    display: "Anzahl inkorrekte Zuordnungen"
                }]
            },
            valueQuantity: {
                value: incorrectAssignmentAmount
            }
        })

    }


    addDuration(duration: number) {

        super.addComponent({
            code: {
                coding: [{
                    system: "http://midata.coop/MSCogTestSDPrep",
                    code: "Duration",
                    display: "Dauer der Übung"
                }]
            },
            valueQuantity: {
                value: duration,
                unit: "s",
                code: "s",
                system: "http://unitsofmeasure.org"
            }
        })

    }

    addClickFrequency(clickFreq: number) {

        super.addComponent({
            code: {
                coding: [{
                    system: "http://midata.coop/MSCogTestSDPrep",
                    code: "ClickFrequency",
                    display: "Klickfrequenz pro Minute"
                }]
            },
            valueQuantity: {
                value: clickFreq
            }
        });

    }

    addNumberOfAttempts(attemptsNr: number) {

        super.addComponent({
            code: {
                coding: [{
                    system: "http://midata.coop/MSCogTestSDPrep",
                    code: "NumberOfAttempts",
                    display: "Anzahl der Versuche"
                }]
            },
            valueQuantity: {
                value: attemptsNr
            }
        });

    }


    addResultsPerClick(rawData: any[]) {
        let data = this._processClickResult(rawData);

        super.addComponent({
            code: {
                coding: [{
                    system: "http://midata.coop/MSCogTestSDPrep",
                    code: "ResultsPerClick",
                    display: "Zeitpunkt & korrekte/inkorrekte Zuordung der Zahl zum Symbol per Klick"
                }]
            },
            valueSampledData: {
                origin: {
                    value: 0
                },
                period: 0,
                dimensions: 3,
                data: data
             }
        });

    }

    private _processClickResult(data: any[]): string {
        var string = '';
        for (let e of data) {
            string += e.t + " " + e.r + " ; ";
        }

        return string;
    }
};