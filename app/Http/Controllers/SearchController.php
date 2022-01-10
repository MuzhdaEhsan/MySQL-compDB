<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        if (strlen($request->input('keyword')) === 0) {
            return response()->json('Missing keyword param.', 422);
        } else if (!$request->input('type')) {
            return response()->json('Missing type param.', 422);
        }

        $keywords = explode(' ', $request->input('keyword'));
        $toTsquery = "";

        // Manually extract tokens from search query instead of using plainto_tsquery
        // because it will remove words like the, a, an, etc.
        // e.g. Problem sol will be converted into "Problem:* & Sol:*"
        // The :* will match anything after that and the & means the result must contain all tokens
        foreach ($keywords as $key => $value) {
            $toTsquery .= $value . ':*';
            if ($key < count($keywords) - 1) {
                $toTsquery .= ' & ';
            }
        }

        $table = "";
        $col = "";

        switch ($request->input('type')) {
            case 'competencies':
            case null:
                $table = "competencies";
                $col = "competencies_index_col";
                break;
            case 'skills':
                $table = "skills";
                $col = "skills_index_col";
                break;
            case 'attributes':
                $table = "attributes";
                $col = "attributes_index_col";
                break;
            case 'knowledge':
                $table = "knowledge";
                $col = "knowledge_index_col";
                break;
            case 'courses':
                $table = "courses";
                $col = "courses_index_col";
                break;
            default:
                break;
        }

        $results = DB::select("SELECT * FROM {$table} WHERE {$col} @@ to_tsquery('simple', ?);", [$toTsquery]);

        // Add highlighted text to each result
        foreach ($results as $result) {
            if ($request->input('type') === 'courses') {
                $result->highlight = DB::select(
                    "SELECT ts_headline('simple', ?, to_tsquery('simple', ?),
                    'HighlightAll=true, StartSel=<mark>, StopSel=</mark>')",
                    ["{$result->code} - {$result->full_name}", $toTsquery]
                )[0]->ts_headline;
            } else {
                $result->highlight = DB::select(
                    "SELECT ts_headline('simple', ?, to_tsquery('simple', ?),
                    'HighlightAll=true, StartSel=<mark>, StopSel=</mark>')",
                    ["{$result->code} - {$result->short_name} <br> {$result->statement}", $toTsquery]
                )[0]->ts_headline;
            }
        }

        return response()->json([
            'data' => $results
        ]);
    }
}
