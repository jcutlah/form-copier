require('dotenv').config();
const Axios = require('axios');

const apiUrl = "https://api.hubapi.com";
const formsApi = "/forms/v2/forms/";
const fields = [];


const formFunctions = {
    getForm: function(guid) {
        Axios.get(apiUrl + formsApi + guid + "?hapikey=" + process.env.srcKey)
            .then(response => {
                // console.log(response.data.formFieldGroups);
                const groups = response.data.formFieldGroups;
                groups.forEach(group => {
                    // console.log(group.fields);
                    group.fields.forEach(field => {
                        console.log(field);
                        fields.push(field.name)
                        const deps = field.dependentFieldFilters;
                        if (deps.length){
                            deps.forEach(filter => {
                                const depField = filter.dependentFormField;
                                console.log(depField);
                                fields.push(depField.name)
                            })
                        }
                    })
                })
                console.log(fields)
            })
            .catch(err => {
                console.log(err);
            })
    }
};

module.exports = formFunctions;