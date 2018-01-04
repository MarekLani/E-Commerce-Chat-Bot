es_query_products['size'] = 4
price_regex = re.search(r'(do|nad|od|pod|okolo)?\s*([\d]+)\s*(eur|euro|E|€)*', es_search, )
less_text = ['do', 'pod']
more_text = ['od', 'nad']
if price_regex:
    if price_regex.group(1) and price_regex.group(1) in less_text:
        es_query_products['query']['bool']["filter"] = {'range': {'price_incl_tax': {"lte": price_regex.group(2)}}}
    elif price_regex.group(1) and price_regex.group(1) in more_text:
        es_query_products['query']['bool']["filter"] = {'range': {'price_incl_tax': {"gte": price_regex.group(2)}}}
    else:
        es_query_products['query']['bool']["filter"] = {'range': {
            'price_incl_tax': {
                "lte": int(price_regex.group(2)) + config.SEARCH_PRICE_DIFF,
                "gte": int(price_regex.group(2)) - config.SEARCH_PRICE_DIFF}}
        }
    es_search = re.sub('(do|nad|od|pod|okolo)?\s*([\d]+)\s*(eur|euro|E|€)*', '', es_search)
    es_query_products["query"]["bool"]["must"]["multi_match"]["query"] = es_search
