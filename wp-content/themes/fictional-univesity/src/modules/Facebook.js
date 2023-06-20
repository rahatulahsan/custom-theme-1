import $ from 'jquery';

class Facebook {

    constructor(){
        this.searchButton = $("#search-term");
        this.searchField = $("#search-input");
        this.searchResult = $('.table-responsive');
        this.events();
    }

    events(){
        this.searchButton.on('click', this.getResults.bind(this));
        setTimeout(()=>this.searchField.focus(), 301);
    }

    //methods here

    getResults(e){

        var name  = this.searchField.val();
        alert(name);
      
        $.ajax({

            url: 'https://graph.facebook.com/search',
            data: {
                'type' : 'adinterest',
                'q' : name,
                'limit': '500',
                'locale': 'en_US',
                'access_token': '562476534284148%7CRR0VTMWxhtPFVGMbPS8_GkQPmHQ'

            },
            success: (response)=>{
                console.log('congrats');
                console.log(response);
                var links = response['data'];
                console.log(links);

                $.each(links, function(index, item) {

                    var low = item.audience_size_lower_bound;
                    var high = item.audience_size_upper_bound;
                    var lower_Bound = low.toLocaleString('en-US');
                    var upper_Bound = high.toLocaleString('en-US');
                    var el = `
                        <tr>
                          <td>${item.id}</td>
                          <td>${item.name}</td>
                          <td>${lower_Bound}</td>
                          <td>${upper_Bound}</td>
                        </tr>
                    `;
        
                     $('.table > tbody').append(el);
                });
            },

            error: (response)=>{
                console.log('failed');
            }
        });
        
    }
}

export default Facebook;